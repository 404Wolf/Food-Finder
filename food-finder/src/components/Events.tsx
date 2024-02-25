"use client";

import { useState, useEffect } from "react";
import EventCard from "@/components/EventCard";
import { FoodEvent } from "@/models/Event";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

export default function Events(props: { events: FoodEvent[] }) {
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
