import OpenAI from "openai";
import { FoodInfo } from "../Event";
import dotenv from "dotenv";

const openai_key = dotenv.config().parsed.OPENAI_KEY;
const openai = new OpenAI({
  apiKey: openai_key,
});

function extractLastNumber(str) {
    const matches = str.match(/\d+/g); // Match all numbers in the string
    if (matches && matches.length > 0) {
        return parseInt(matches[matches.length - 1]); // Return the last matched number
    } else {
        return null; // Return null if no number is found
    }
}


export const analyzer = {
  analyze: async (description: string) => {
    const prompt =
      `Here is a description of a student-run event located at a local university, describing an engaging opportunity for students on campus. Your job is to read the description, and determine whether the event provides food or not to people attending the event. You are also tasked with rating the food on a scale from 1 to 10, with 1 representing cheap snacks and 10 representing a fully prepared feast. If no part of the event mentions food, rate the food a 0. Several examples are provided.` +
      `\n\n Description: This is a group Group Meeting\nYou respond: "0"` +
      `\n\n Scheduled, 30 minute, 1:1, confidential Zoom consultation with Director of Clinical Counseling Services, Equity, & Inclusion, Naomi Drakeford, Ph.D. or an in-person consultation with Multicultural Specialist\nYou respond: "0"` +
      `\n\n Description: For this month's coffee-tasting event, we are featuring a Japanese-style dark roast coffee on espresso: Project X by Sawada Coffee! Founded by Hiroshi Sawada, Sawada Coffee took inspiration from Sawada's time in a Tokyo cafe, during which he secretly worked on a coffee blend that reflected a classic, Japanese flavor profile (hence the name Project X).\nYou respond: "8"` +
      `\n\n Description: Join the African Student Association at our annual Karaoke event, Battle of the Mics, where you can watch and/or sing your favorite African songs, from Afrobeats to Amapiano! Enjoy lighthearted competition, great music, delicious food, and an incredible time to start off the spring semester..\nYou respond: "7"`;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "assistant", content: prompt },
        { role: "user", content: description },
      ],
      model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0]);

    const foodInfo: FoodInfo = {
      rating: extractLastNumber(completion.choices[0].message.content),
      description: "placeholder",
      cuisine: "placeholder",
      volunteer: false,
    };

    return foodInfo;
  },
};
