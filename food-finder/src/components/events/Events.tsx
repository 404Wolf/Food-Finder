"use client";

import EventCard from "@/components/events/EventCard";
import { Event } from "@/models/Event";
import BlankEventCard from "../BlankEventCard";
import { useMemo } from "react";

export default function Events(props: { events?: Event[] }) {
    const blankCardIds = useMemo(() => Array.from({ length: 20 }, (_, i) => -i), []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative items-top">
            {props.events !== undefined
                ? props.events
                      .filter((event) => event !== undefined)
                      .map((event, i) => (
                          <div className="basis-1/2" key={-i}>
                              <EventCard eventInfo={event} key={i} />
                          </div>
                      ))
                : blankCardIds.map((_, i) => (
                      <div className="basis-1/2" key={-i}>
                          <BlankEventCard />
                      </div>
                  ))}
        </div>
    );
}
