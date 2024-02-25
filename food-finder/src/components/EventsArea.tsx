"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { FoodEvent } from "@/models/Event";
import Events from "./Events";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

interface InputStatus {
    inPersonOnly: boolean;
    excludeVolunteer: boolean;
}

function filterEvents(events: FoodEvent[], inPersonOnly: boolean, excludeVolunteer: boolean) {
    let eventsFiltered = events;
    if (inPersonOnly && excludeVolunteer) {
        eventsFiltered = events.filter((event) => {
            return event.location.name !== "Online Event" && event.food.volunteer === false;
        });
    } else if (inPersonOnly) {
        eventsFiltered = events.filter((event) => {
            return event.location.name !== "Online Event";
        });
    } else if (excludeVolunteer) {
        eventsFiltered = events.filter((event) => {
            return event.food.volunteer === false;
        });
    } else {
        eventsFiltered = events;
    }
    return eventsFiltered;
}

function sortEvents(events: FoodEvent[]) {
    return events.sort((a, b) => {
        return a.date < b.date ? -1 : 1;
    });
}

export function EventsArea() {
    const [events, setEvents] = useState<FoodEvent[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<FoodEvent[]>([]);
    const [inputStatus, setInputStatus] = useState<InputStatus>({
        inPersonOnly: false,
        excludeVolunteer: false,
    });

    useEffect(() => {
        fetch("/api/events")
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data);
                setEvents(
                    sortEvents(
                        data.data.filter((eventInfo: FoodEvent) => {
                            return eventInfo !== undefined;
                        }) as FoodEvent[]
                    )
                );
            });
    }, [inputStatus]);

    console.log(filteredEvents);

    return (
        <>
        
            <div className="flex-col gap-3">
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange={(e) =>
                                setInputStatus({ ...inputStatus, inPersonOnly: e.target.checked })
                            }
                            checked={inputStatus.inPersonOnly}
                        />
                    }
                    label="In Person Events"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange={(e) =>
                                setInputStatus({
                                    ...inputStatus,
                                    excludeVolunteer: e.target.checked,
                                })
                            }
                            checked={inputStatus.excludeVolunteer}
                        />
                    }
                    label="Exclude Volunteer Events"
                />
            </div>
            <Events events={events} />
        </>
    );
}
