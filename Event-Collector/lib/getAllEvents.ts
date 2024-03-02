import { getAuthHeaders, getEventInfo } from "./puppetGetInfo";
import nodeIcal, { VEvent } from "node-ical";
import pLimit from "p-limit";

import { Event, IcalEvent } from "../Event";
import { analyzer } from "./getFoodInfo";
import { uploadEvent } from "./uploadEvents";
import { PuppeteerEvent } from "./puppetGetInfo";
import getExistingEvents from "./getExistingEvents";
import sendFinalMetadata from "./sendFinalMetadata";

const CWRU_ICAL_URL = "https://community.case.edu/ical/ical_cwru.ics";
const CASE_ID = process.env.CASE_ID;
const CASE_PASSWORD = process.env.CASE_PASSWORD;

export async function getEventIds() {
    const eventIds: string[] = [];

    const events = await nodeIcal.async.fromURL(CWRU_ICAL_URL);

    for (const key of Object.keys(events)) {
        if (key === "vcalendar") continue;

        const event = events[key] as VEvent;

        // If the event has already passed, don't bother analyzing it
        if (event.start < new Date()) {
            console.debug(`Skipping event ${event.location} because it has already passed`);
            continue;
        }

        if (!event.description || !event.summary) continue;

        const id = event.description.split(
            "\n---\nEvent Details: https://community.case.edu/rsvp?id="
        )[1];

        eventIds.push(id);
    }

    console.log(`Fetched event IDs:\n${JSON.stringify(eventIds)}`);
    return eventIds;
}

async function puppetToCaseEvent(event: PuppeteerEvent, eventId: string): Promise<IcalEvent> {
    const name = event.name;
    const description = event.description;
    const time = event.startDate;
    const bannerSrc = event.image;
    const location = event.location;

    const eventInfo: IcalEvent = {
        _id: Number.parseInt(eventId),
        name: name,
        description,
        date: new Date(time),
        bannerSrc:
            bannerSrc && bannerSrc.length && bannerSrc.length > 0
                ? bannerSrc[0]
                : "/placeholder.webp",
        location,
        fetchedAt: new Date(),
    };
    return eventInfo;
}

export async function getAndStoreAllEvents() {
    const authHeaders = await getAuthHeaders(CASE_ID, CASE_PASSWORD);

    const dbEvents = await getExistingEvents();
    const existingEventIds = new Set(dbEvents.map((x) => x._id.toString()));
    const eventIds = await getEventIds();

    const limit = pLimit(15);

    async function getAndUploadEvent(id: string) {
        if (existingEventIds.has(id)) {
            console.debug(`Skipping event ${id} because it has already been fetched`);
            return;
        }

        const data = await getEventInfo(id, authHeaders);
        if (!data) return;

        const eventPageInfo = await puppetToCaseEvent(data, id);

        // If the event has already passed, don't bother analyzing it
        if (eventPageInfo.date < new Date()) {
            console.debug(`Skipping event ${id} because it has already passed`);
            return;
        }

        const eventAiInfo = await analyzer.analyze(
            eventPageInfo.name + "\n" + eventPageInfo.description
        );
        if (!eventAiInfo) {
            console.debug(
                `Skipping fetching additional info for event ${id} because ai couldn't analyze it`
            );
            return;
        }

        const foodEvent: Event = {
            ...eventPageInfo,
            food: {
                rating: eventAiInfo.rating,
                cuisine: eventAiInfo.cuisine,
                volunteer: eventAiInfo.volunteer,
                fetchedAt: new Date(),
            },
            onCampus: eventAiInfo.onCampus,
            fetchedAt: new Date(),
        };

        console.debug(`Fetched event:\n${JSON.stringify(foodEvent)}`);
        uploadEvent(foodEvent);
    }

    const timeout = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const withTimeout = async (promise, timeoutMs) => {
        return Promise.race([promise, timeout(timeoutMs)]);
    };

    await Promise.all(
        eventIds.map((id) =>
            withTimeout(
                limit(async () => await getAndUploadEvent(id)),
                60000
            )
        )
    );

    await sendFinalMetadata();
}
