import { CaseEvent } from "../app/models/Event";

import OpenAI from "openai";
import nodeIcal from "node-ical";
import { VEvent } from "node-ical";

import { JSDOM } from "jsdom";

const CWRU_ICAL_URL = "https://community.case.edu/ical/ical_cwru.ics";


const openai = new OpenAI();

// Yields successive windows of the input array of length `chunkSize`
function* iterateInChunks<T>(array: T[], chunkSize: number): Generator<T[]> {
    for (let i = 0; i < array.length; i += chunkSize)
        yield array.slice(i, i + chunkSize);
}

// Given an id for a case event (e.g. 2251998)
async function fetchImageSrcForId(id: string): Promise<string | null> {
    const url = `https://community.case.edu/rsvp?id=${id}`;

    const html = await fetch(url).then(x => x.text());
    const dom = new JSDOM(html);

    const card = dom.window.document.querySelector(".rsvp__event-card");
    if (card === null) return null;

    const img = card.querySelector("img");
    if (img === null) return null;

    return img.src;
}

export const ical = {
    fetch: async (url: string): Promise<CaseEvent[]> => {
        const caseEvents = [];

        const events = await nodeIcal.async.fromURL(url);
        const now = new Date();

        // events is an object that contains both a couple of thousand events, while a unique id as a key and a VEvent as the value,
        // as well as a single element with a key of "vcalendar" and a value of information about the calendar

        for (const key of Object.keys(events)) {
            if (key === "vcalendar")
                continue;

            const event = events[key] as VEvent;

            // Filter out invalid events and events that have already occurred
            if (!event.description || !event.summary)
                continue;

            if (event.datetype == "date-time" && event.start && event.start < now)
                continue;

            // All events end with the the same string (with an id following it), so split the description from the id
            const [description, id] = event.description.split("\n---\nEvent Details: https://community.case.edu/rsvp?id=")[0];

            const bannerSrc = await fetchImageSrcForId(id);
            if (!bannerSrc)
                continue;

            caseEvents.push({
                name: event.summary.val,
                description,
                time: event.start.toLocaleString(),
                bannerSrc,
            });
        }

        return caseEvents;
    },

    parse: (data: string): {} => {
        return {};
    },
};

// https://community.case.edu/brewcwru/rsvp_boot?id=2254804
export const analyzer = {
    analyze: async () => {
        const prompt = `Here is a description of a student-run event located at a local university, describing an engaging opportunity for students on campus. Your job is to read the description, and determine whether the event provides food or not to people attending the event. You are also tasked with rating the food on a scale from 1 to 10, with 1 representing cheap snacks and 10 representing a fully prepared feast. If no part of the event mentions food, rate the food a 0. Several examples are provided.`
        + `\n\n Description: This is a group Group Meeting\nYou respond: "0"`
        + `\n\n Scheduled, 30 minute, 1:1, confidential Zoom consultation with Director of Clinical Counseling Services, Equity, & Inclusion, Naomi Drakeford, Ph.D. or an in-person consultation with Multicultural Specialist\nYou respond: "0"`
        + `\n\n Description: For this month's coffee-tasting event, we are featuring a Japanese-style dark roast coffee on espresso: Project X by Sawada Coffee! Founded by Hiroshi Sawada, Sawada Coffee took inspiration from Sawada's time in a Tokyo cafe, during which he secretly worked on a coffee blend that reflected a classic, Japanese flavor profile (hence the name Project X).\nYou respond: "8"`
        + `\n\n Description: Join the African Student Association at our annual Karaoke event, Battle of the Mics, where you can watch and/or sing your favorite African songs, from Afrobeats to Amapiano! Enjoy lighthearted competition, great music, delicious food, and an incredible time to start off the spring semester..\nYou respond: "7"`;

        const completion = await openai.chat.completions.create({
            messages: [{ role: "assistant", content: prompt }],
            model: "gpt-3.5-turbo",
        });

        console.log(completion.choices[0]);

        return {};
    },
};

const main = async () => {
    // const icalData = await ical.fetch(CWRU_ICAL_URL);
    // console.log(icalData);

    analyzer.analyze();
};

main();
