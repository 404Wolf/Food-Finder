import fs from "fs";
import OpenAI from "openai";
import { FineTuningJobEvent } from "openai/resources/fine-tuning";

const EXAMPLE_FILE = "examples.jsonl";
import {prompt, examples} from "./examples";

// OpenAI's fine tuning would like each example in the form:
// {"messages": [{"role": "system", "content": "Marv is a factual chatbot that is also sarcastic."}, {"role": "user", "content": "What's the capital of France?"}, {"role": "assistant", "content": "Paris, as if everyone doesn't know that already."}]}
// This function translates the examples into that format

export function translateExamples() {
  let ex: any = [];

  for (const example of examples) {
    const description = example.description;

    const response = JSON.stringify({
      rating: example.rating,
      cuisine: example.cuisine,
      volunteer: example.volunteer,
    });

    ex.push({
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: description },
        { role: "assistant", content: response },
      ]
    });
  }

  const contents = ex.map((x: any) => JSON.stringify(x)).join("\n");
  fs.writeFileSync(EXAMPLE_FILE, contents);
}

// Modified from https://github.com/openai/openai-node/blob/master/examples/fine-tuning.ts
export async function executeFineTuning() {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  let file = await openai.files.create({
    file: fs.createReadStream(EXAMPLE_FILE),
    purpose: "fine-tune",
  });

  console.log(`Uploaded file with ID: ${file.id}, waiting for file to be processed...`);

  while (true) {
    file = await openai.files.retrieve(file.id);
    console.log(`File status: ${file.status}`);

    if (file.status === "processed") {
      break;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  console.log(`Starting fine-tuning`);
  let fineTune = await openai.fineTuning.jobs.create({ model: "gpt-3.5-turbo", training_file: file.id });
  console.log(`Fine-tuning ID: ${fineTune.id}`);

  console.log(`Track fine-tuning progress:`);

  const events: Record<string, FineTuningJobEvent> = {};

  while (fineTune.status == "validating_files" || fineTune.status == "queued" || fineTune.status == "running") {
    fineTune = await openai.fineTuning.jobs.retrieve(fineTune.id);
    console.log(`${fineTune.status}`);

    const { data } = await openai.fineTuning.jobs.listEvents(fineTune.id, { limit: 100 });
    for (const event of data.reverse()) {
      if (event.id in events) continue;
      events[event.id] = event;
      const timestamp = new Date(event.created_at * 1000);
      console.log(`- ${timestamp.toLocaleTimeString()}: ${event.message}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  console.log("Fine tuning complete.");
}
