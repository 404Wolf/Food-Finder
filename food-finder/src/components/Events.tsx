"use client";

import { useState, useEffect } from "react";
import EventCard from "@/components/EventCard";
import { FoodEvent } from "@/models/Event";

export default function Events(props: { events: FoodEvent[] }) {
    if (props.events === undefined) {
        return <div></div>;
    }

    return (
        <div>
            {props.events
                .filter((event) => event !== undefined)
                .map((event, i) => (
                    <EventCard eventInfo={event} key={i} />
                ))}
        </div>
    );
}
