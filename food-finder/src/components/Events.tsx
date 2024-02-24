"use client";

import { useState, useEffect } from "react";
import EventCard from "@/components/EventCard";
import { FoodEvent } from "../../../event-collector/Event";

export default function Events() {
    const [events, setEvents] = useState<FoodEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/events")
            .then((res) => res.json())
            .then((data) => {
                setEvents(data.data);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    console.log(events);

    return (
        <div>
            {events.map((event, i) => (
                <EventCard event={event} key={i} />
            ))}
        </div>
    );
}
