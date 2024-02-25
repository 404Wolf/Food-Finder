import OpenAI from "openai";
import { Food } from "../Event";
import { configDotenv } from "dotenv";

// Generated from /tuning/index.ts
const FINE_TUNED_MODEL = "ft:gpt-3.5-turbo-0613:personal::8w0XHqim";

const openai = new OpenAI({ apiKey: configDotenv().parsed.OPENAI_API_KEY });

export const analyzer = {
    analyze: async (description: string): Promise<Food | null> => {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: `Your job is to read the description of a student-run event located at a local university, and determine whether the event provides food or not to people attending the event. You are also tasked with rating the food on a scale from 1 to 10, with 1 representing cheap canned food and 10 representing a fully prepared feast. If no part of the event mentions food, rate the food a 0. If there is food provided, to classify what cuisine the food is, which MUST be one of the following values: Pizza, Beverages, Cultural, Healthy, Sweets, Unknown, and None. Additionally, indicate whether this event is for volunteers or is offering food to the community. If it is, say true, otherwise if it is not or if taking food, say false. Additionally, indicate whether the location is on the university campus, or requires traveling off campus, also true or false (say true if it is unknown). Output each of these fields in a JSON object with the fields "rating", "cuisine", "volunteer", and "onCampus"` },
                { role: "user", content: description }],
            model: FINE_TUNED_MODEL,
        });

        const response = completion.choices[0].message.content;

        try {
            const data = JSON.parse(response);

            const foodInfo: Food = {
                description: description,
                ...data
            };

            return foodInfo;
        } catch {
            return null;
        }
    },
};
