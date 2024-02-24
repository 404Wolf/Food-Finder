import { getAuthHeaders, getEventInfo } from "./puppetGetInfo.js";
import nodeIcal from "node-ical";

// interface PuppeteerEvent {
//     "@context": string,
//     "@type": string,
//     "name": string,
//     "startDate": string,
//     "endDate": string,
//     "location": {
//         "@type": string,
//         "name": string,
//         "address": string,
//     },
//     "image": string,
//     "description": string,
// }

const CWRU_ICAL_URL = "https://community.case.edu/ical/ical_cwru.ics";

async function getEventIds() {
    const eventIds = [];

    const events = await nodeIcal.async.fromURL(CWRU_ICAL_URL);

    for (const key of Object.keys(events)) {
        if (key === "vcalendar")
            continue;

        const event = events[key];

        if (!event.description || !event.summary)
            continue;

        const id = event.description.split("\n---\nEvent Details: https://community.case.edu/rsvp?id=")[0][1];

        eventIds.push(id);
    }
    console.log(eventIds);
}
getEventIds();