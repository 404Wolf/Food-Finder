import { getAuthHeaders, getEventInfo } from "./puppetGetInfo";
import nodeIcal, { VEvent } from "node-ical";
import { Event, Food, FoodEvent } from "../Event";
import { analyzer } from "./getFoodInfo";
import { uploadEvent } from "./uploadEvents";
import { PuppeteerEvent } from "./puppetGetInfo";
import getExistingEvents from "./getExistingEvents";

const CWRU_ICAL_URL = "https://community.case.edu/ical/ical_cwru.ics";
const CASE_ID = process.env.CASE_ID;
const CASE_PASSWORD = process.env.CASE_PASSWORD;
const authHeaders = getAuthHeaders(CASE_ID, CASE_PASSWORD);

export async function getEventIds() {
    const eventIds: string[] = [];

    const events = await nodeIcal.async.fromURL(CWRU_ICAL_URL);

    for (const key of Object.keys(events)) {
        if (key === "vcalendar") continue;

        const event = events[key] as VEvent;

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

    const eventInfo: Event = {
        _id: eventId,
        name,
        description,
        date: new Date(time),
        bannerSrc,
    };
    return eventInfo;
}

export async function getAllEvents() {
    const existingEventIds = new Set(await getExistingEvents());
    const eventIds = await getEventIds();
    const events = [];

    for (const id of eventIds) {
        if (existingEventIds.has(id)) {
            console.debug("Skipping event " + id);
            continue;
        }

        const data = await getEventInfo(id, authHeaders);
        const eventInfo = await puppetToCaseEvent(data, id);
        const foodInfo = await analyzer.analyze(eventInfo.description);
        const event: FoodEvent = {
            food: foodInfo,
            event: eventInfo,
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
