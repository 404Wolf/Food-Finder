import { getAllEvents } from "@/utils/getAllEvents";
import { parseEventFilters } from "@/utils/parseEventFilters";
import ical, { ICalCalendarMethod } from "ical-generator";

export async function GET(request: Request) {
    const events = await getAllEvents({ minRating: 1, ...parseEventFilters(request.url) });

    const calendar = ical({ name: "Free CWRU Food", description: "Free food events at CWRU" });

    // A method is required for outlook to display event as an invitation
    calendar.method(ICalCalendarMethod.REQUEST);

    // Add each event to the calendar
    for (const event of events) {
        calendar.createEvent({
            start: event.date,
            end: event.date,
            summary: event.name,
            description: event.description,
            location: `${event.location.name} - ${event.location.address}`,
            url: `https://community.case.edu/rsvp?id=${event._id}`,
        });
    }

    return new Response(calendar.toString(), {
        headers: {
            "Content-Type": "text/calendar",
        },
        status: 200,
    });
}
