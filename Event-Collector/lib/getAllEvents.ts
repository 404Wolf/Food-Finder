import { getAuthHeaders, getEventInfo } from "./puppetGetInfo";
import nodeIcal, { VEvent } from "node-ical";
import pLimit from "p-limit";

import { Event, IcalEvent } from "../Event";
import { analyzer } from "./getFoodInfo";
import { uploadEvent, uploadFailure } from "./uploadEvents";
import { PuppeteerEvent } from "./puppetGetInfo";
import getExistingEvents from "./getExistingEvents";
import { mongoConnect } from "./mongoConnect";

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
            console.debug(`Skipping event because it has already passed`);
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
    try {
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
    } catch (e) {
        console.error(`Error in puppetToCaseEvent: ${e}`);
        return null;
    }
}

export async function getAndStoreAllEvents() {
    const { db, client } = await mongoConnect();
    const dbMetadata = await db.collection("metadata");
    const authHeaders = await getAuthHeaders(CASE_ID, CASE_PASSWORD);
    const existingEventIds = await getExistingEvents();

    const eventIds = await getEventIds();

    const limit = pLimit(50);

    async function getAndUploadEvent(id: string) {
        if (existingEventIds.has(id)) {
            console.debug(`Skipping event because it has already been fetched`);
            return;
        }

        const data = await getEventInfo(id, authHeaders);
        if (data === null) {
            uploadFailure({ _id: Number.parseInt(id) });
        }

        const eventPageInfo = await puppetToCaseEvent(data, id);
        if (eventPageInfo === null) {
            console.debug(`Skipping event ${id} because it couldn't be fetched`);
            uploadFailure({ _id: Number.parseInt(id) });
            return;
        }

        // If the event has already passed, don't bother analyzing it
        if (eventPageInfo.date < new Date()) {
            console.debug(`Skipping event because it has already passed`);
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

    await Promise.all(
        eventIds.map((id) =>
            limit(async () => {
                await getAndUploadEvent(id);
            })
        )
    );

    await dbMetadata.updateOne(
        { name: "refreshedAt" },
        { $set: { date: new Date() } },
        { upsert: true }
    );

    // Close the database connection when all events have been fetched and stored
    await client.close();
}
