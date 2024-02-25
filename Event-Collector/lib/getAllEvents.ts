import { getAuthHeaders, getEventInfo } from "./puppetGetInfo";
import nodeIcal, { VEvent } from "node-ical";
import { Event, Food, FoodEvent } from "../Event";
import { analyzer } from "./getFoodInfo";
import { uploadEvent } from "./uploadEvents";
import { PuppeteerEvent } from "./puppetGetInfo";
import getExistingEvents from "./getExistingEvents";

import pLimit from "p-limit";

const CWRU_ICAL_URL = "https://community.case.edu/ical/ical_cwru.ics";
const CASE_ID = process.env.CASE_ID;
const CASE_PASSWORD = process.env.CASE_PASSWORD;

export async function getEventIds() {
    const eventIds: string[] = [];

    const events = await nodeIcal.async.fromURL(CWRU_ICAL_URL);

    for (const key of Object.keys(events)) {
        if (key === "vcalendar") continue;

        const event = events[key] as VEvent;

        const date = new Date(event.start);

        const now = new Date();

        // If the event has already passed, don't bother analyzing it
        if (event.start < now) {
            console.debug(`Skipping event ${event.location} because it has already passed`);
            continue;
        }

        if (!event.description || !event.summary) continue;

        const id = event.description.split(
            "\n---\nEvent Details: https://community.case.edu/rsvp?id="
        )[1];

        eventIds.push(id);
    }
    console.log(eventIds);
    return eventIds;
}

async function puppetToCaseEvent(event: PuppeteerEvent, eventId: string): Promise<Event> {
    const name = event.name;
    const description = event.description;
    const time = event.startDate;
    const bannerSrc = event.image;
    const location = event.location;

    const eventInfo: Event = {
        _id: Number.parseInt(eventId),
        name: name,
        description,
        date: new Date(time),
        bannerSrc:
            bannerSrc && bannerSrc.length && bannerSrc.length > 0 ? bannerSrc[0] : "about:blank",
        location,
    };
    return eventInfo;
}

export async function getAllEvents() {
    const authHeaders = await getAuthHeaders(CASE_ID, CASE_PASSWORD);

    const dbEvents = await getExistingEvents();
    const existingEventIds = new Set(dbEvents.map((x) => x._id.toString()));
    const eventIds = await getEventIds();
    const events = [];

    const now = new Date();
    const limit = pLimit(5);

    for (const id of eventIds) {
        if (existingEventIds.has(id)) {
            console.debug(`Skipping event ${id}`);
            continue;
        }

        const data = await getEventInfo(id, authHeaders);
        const eventInfo = await puppetToCaseEvent(data, id);

        // If the event has already passed, don't bother analyzing it
        if (eventInfo.date < now) {
            console.debug(`Skipping event ${id} because it has already passed`);
            continue;
        }

        const foodInfo = await analyzer.analyze(eventInfo.description);
        const event: FoodEvent = {
            food: foodInfo,
            ...eventInfo,
            fetchedAt: new Date(),
        };
        if (event.food.rating > 0) {
            console.debug(event);
        }
        events.push(event);
        uploadEvent(event);
    }

    console.debug("Fetches events:\n" + JSON.stringify(events));
    return events;
}
