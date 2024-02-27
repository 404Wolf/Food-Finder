"use client";

import EventCard from "@/components/EventCard";
import { Event } from "@/models/Event";

export default function Events(props: { events: Event[] }) {
    if (props.events === undefined) {
        return <div></div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative items-top">
            {props.events
                .filter((event) => event !== undefined)
                .map((event, i) => (
                    <div className="basis-1/2" key={-i}>
                        <EventCard eventInfo={event} key={i} />
                    </div>
                ))}
        </div>
    );
}
