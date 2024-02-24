import { getAuthHeaders, getEventInfo } from "./puppetGetInfo";
import nodeIcal, { VEvent } from "node-ical";
import { Event, Food, FoodEvent } from "../Event"
import { analyzer } from "./getFoodInfo";
import { uploadEvent } from "./uploadEvents";
import dotenv from "dotenv";
import { PuppeteerEvent } from "./puppetGetInfo";


const CWRU_ICAL_URL = "https://community.case.edu/ical/ical_cwru.ics";
const CASE_ID = process.env.CASE_ID;
const CASE_PASSWORD = process.env.CASE_PASSWORD;
const authHeaders = getAuthHeaders(CASE_ID, CASE_PASSWORD);

export async function getEventIds() {
    const eventIds: string[] = [];

    const events = await nodeIcal.async.fromURL(CWRU_ICAL_URL);

    for (const key of Object.keys(events)) {
        if (key === "vcalendar")
            continue;

        const event = events[key] as VEvent;

        if (!event.description || !event.summary)
            continue;

        const id = event.description.split("\n---\nEvent Details: https://community.case.edu/rsvp?id=")[1];

        eventIds.push(id);
    }
    console.log(eventIds);
    return eventIds;
}

async function puppetToCaseEvent(event: PuppeteerEvent, caseID: string): Promise<Event> {
    const name = event.name;
    const description = event.description;
    const time = event.startDate;
    const bannerSrc = event.image;

    const caseEvent: Event = {
        name,
        description,
        time,
        bannerSrc,
        caseID,
    }
    return caseEvent;

}

export async function getAllEvents() {
    const eventIds = await getEventIds();
    const events = [];

    for (const id of eventIds) {
        const data = await getEventInfo(id, authHeaders);
        const caseEvent = await puppetToCaseEvent(data, id);
        const foodInfo = await analyzer.analyze(caseEvent.description);
        const event: FoodEvent = {
            food: foodInfo,
            event: caseEvent,
        }
        if (event.food.rating > 0) {console.log(event)}
        events.push(event);
        uploadEvent(event);
    }

    console.log(events);
    return events;
}