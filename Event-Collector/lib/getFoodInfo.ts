import OpenAI from "openai";
import { Food } from "../Event";
import { configDotenv } from "dotenv";

const openai = new OpenAI({ apiKey: configDotenv().parsed.OPENAI_API_KEY });

function extractLastNumber(str: string) {
    const matches = str.matchAll(/\d+/g); // Match all numbers in the string
    for (const match of matches) {
        if (match) {
            return Number.parseInt(match[0]);
        }
    }
    return 0;
}

export const analyzer = {
    analyze: async (description: string) => {
        const ratingPrompt =
            `Here is a description of a student-run event located at a local university, describing an engaging opportunity for students on campus. Your job is to read the description, and determine whether the event provides food or not to people attending the event. You are also tasked with rating the food on a scale from 1 to 10, with 1 representing cheap snacks and 10 representing a fully prepared feast. If no part of the event mentions food, rate the food a 0. Several examples are provided. Only respond with a number. Your response will just be a number from 0 to 10.` +
            `\n\n Description: This is a group Group Meeting\nYou respond: "0"` +
            `\n\n Scheduled, 30 minute, 1:1, confidential Zoom consultation with Director of Clinical Counseling Services, Equity, & Inclusion, Naomi Drakeford, Ph.D. or an in-person consultation with Multicultural Specialist\nYou respond: "0"` +
            `\n\n Description: For this month's coffee-tasting event, we are featuring a Japanese-style dark roast coffee on espresso: Project X by Sawada Coffee! Founded by Hiroshi Sawada, Sawada Coffee took inspiration from Sawada's time in a Tokyo cafe, during which he secretly worked on a coffee blend that reflected a classic, Japanese flavor profile (hence the name Project X).\nYou respond: "8"` +
            `\n\n Description: Join the African Student Association at our annual Karaoke event, Battle of the Mics, where you can watch and/or sing your favorite African songs, from Afrobeats to Amapiano! Enjoy lighthearted competition, great music, delicious food, and an incredible time to start off the spring semester..\nYou respond: "7"`;

        const descriptionPrompt =
            `Here is a description of a student-run event located at a local university, describing an engaging opportunity for students on campus. The event will have food. Your job is to use the event description to write a brief description fo the food that there will be at the event. Several examples are provided.` +
            `\n\n Description: For this month's coffee-tasting event, we are featuring a Japanese-style dark roast coffee on espresso: Project X by Sawada Coffee! Founded by Hiroshi Sawada, Sawada Coffee took inspiration from Sawada's time in a Tokyo cafe, during which he secretly worked on a coffee blend that reflected a classic, Japanese flavor profile (hence the name Project X).\nYou respond: "Various fancy coffees"` +
            `\n\n Description: Join the African Student Association at our annual Karaoke event, Battle of the Mics, where you can watch and/or sing your favorite African songs, from Afrobeats to Amapiano! Enjoy lighthearted competition, great music, delicious food, and an incredible time to start off the spring semester..\nYou respond: "African style food"`;

        const cuisinePrompt =
            `Here is a description of a student-run event located at a local university, describing an engaging opportunity for students on campus. The event will have food. Your job is to use the event description to write the cuisine of the food that there will be at the event. Several examples are provided.` +
            `\n\n Description: For this month's coffee-tasting event, we are featuring a Japanese-style dark roast coffee on espresso: Project X by Sawada Coffee! Founded by Hiroshi Sawada, Sawada Coffee took inspiration from Sawada's time in a Tokyo cafe, during which he secretly worked on a coffee blend that reflected a classic, Japanese flavor profile (hence the name Project X).\nYou respond: "Japanese"` +
            `\n\n Description: Join the African Student Association at our annual Karaoke event, Battle of the Mics, where you can watch and/or sing your favorite African songs, from Afrobeats to Amapiano! Enjoy lighthearted competition, great music, delicious food, and an incredible time to start off the spring semester..\nYou respond: "African"`;

        const volunteerPrompt =
            `Here is a description of a student-run event located at a local university, describing an engaging opportunity for students on campus. The event will have food. Your job is to indicate whether this event is for volunteers/offering food to the community. Only respond with 'true' or 'false'. Never respond with anything else besides 'true' or 'false'. Several examples are provided:` +
            `\n\n Description: For this month's coffee-tasting event, we are featuring a Japanese-style dark roast coffee on espresso: Project X by Sawada Coffee! Founded by Hiroshi Sawada, Sawada Coffee took inspiration from Sawada's time in a Tokyo cafe, during which he secretly worked on a coffee blend that reflected a classic, Japanese flavor profile (hence the name Project X).\nYou respond: "false"` +
            `\n\n Description: Join the African Student Association at our annual Karaoke event, Battle of the Mics, where you can watch and/or sing your favorite African songs, from Afrobeats to Amapiano! Enjoy lighthearted competition, great music, delicious food, and an incredible time to start off the spring semester..\nYou respond: "false"`; +
            `Each week donations have been available through our partnership with the Hunger Networks Food Rescue Program. 40 % of American's food goes to waste, while 1 in 6 people go hungry right here in Cuyahoga County. Through this partnership we accept extra food from Whole Foods, Giant eagle and Get Go to be distributed to those in need.\nYou respond: "true"`


        const ratingCompletion = await openai.chat.completions.create({
            messages: [
                { role: "assistant", content: ratingPrompt },
                { role: "user", content: description },
            ],
            model: "gpt-3.5-turbo-0125",
        });

        const foodRating = extractLastNumber(ratingCompletion.choices[0].message.content);

        let foodDescription: string;
        let cuisine: string;
        let volunteer: boolean;
        if (foodRating) {
            const foodCompletion = await openai.chat.completions.create({
                messages: [
                    { role: "assistant", content: descriptionPrompt },
                    { role: "user", content: description },
                ],
                model: "gpt-3.5-turbo-0125",
            });
            foodDescription = foodCompletion.choices[0].message.content;

            const cuisineCompletion = await openai.chat.completions.create({
                messages: [
                    { role: "assistant", content: cuisinePrompt },
                    { role: "user", content: description },
                ],
                model: "gpt-3.5-turbo-0125",
            });
            cuisine = cuisineCompletion.choices[0].message.content;

            const volunteerCompletion = await openai.chat.completions.create({
                messages: [
                    { role: "assistant", content: volunteerPrompt },
                    { role: "user", content: description },
                ],
                model: "gpt-3.5-turbo-0125",
            });
            volunteer = volunteerCompletion.choices[0].message.content === "true";
        } else {
            return {
                rating: 0,
                description: "No food provided",
                cuisine: "",
                volunteer: volunteer,
            };
        }

        const foodInfo: Food = {
            rating: foodRating,
            description: foodDescription,
            cuisine: cuisine,
            volunteer: false,
        };

        return foodInfo;
    },
};
