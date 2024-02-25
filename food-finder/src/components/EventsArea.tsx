"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { FoodEvent } from "@/models/Event";
import Events from "./Events";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
    AppBar,
    Autocomplete,
    Box,
    Divider,
    Drawer,
    Grid,
    List,
    Paper,
    Skeleton,
    Stack,
    Switch,
    TextField,
    Toolbar,
    Typography,
    paperClasses,
} from "@mui/material";
import { toTitleCase } from "@/utils/misc";
import { Container } from "@mui/material";

interface InputStatus {
    onCampusOnly: boolean;
    excludeVolunteer: boolean;
    pizzaOnly: boolean;
    cuisines?: string[];
}

function filterEvents(
    events: FoodEvent[],
    onCampusOnly: boolean,
    excludeVolunteer: boolean,
    pizzaOnly: boolean,
    allowedCuisines: string[] = []
) {
    let eventsFiltered = events;

    if (onCampusOnly) {
        eventsFiltered = eventsFiltered.filter((event) => event.food.onCampus);
    }

    if (excludeVolunteer) {
        eventsFiltered = eventsFiltered.filter((event) => !event.food.volunteer);
    }

    if (pizzaOnly) {
        eventsFiltered = eventsFiltered.filter(
            (event) =>
                event.food.cuisine.toLowerCase().includes("pizza") ||
                event.food.description.toLowerCase().includes("pizza")
        );
    }

    if (allowedCuisines.length > 0) {
        eventsFiltered = eventsFiltered.filter((event) => {
            return allowedCuisines.includes(event.food.cuisine);
        });
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
    const [inputStatus, setInputStatus] = useState<InputStatus>({
        onCampusOnly: false,
        excludeVolunteer: false,
        pizzaOnly: false,
    });
    const [cuisines, setCuisines] = useState<string[]>([]);

    useEffect(() => {
        fetch("/api/events")
            .then((res) => res.json())
            .then((data) => {
                if (events.length === 0) {
                    setEvents(data.data);
                }
                setCuisines(
                    Array.from(
                        new Set(
                            data.data.map((event: FoodEvent) => {
                                return event.food.cuisine;
                            })
                        )
                    )
                );
            });
    }, []);

    const shownEvents = useMemo(() => {
        console.log(inputStatus);
        return sortEvents(
            filterEvents(
                events.filter((eventInfo: FoodEvent) => {
                    return eventInfo !== undefined;
                }) as FoodEvent[],
                inputStatus.onCampusOnly,
                inputStatus.excludeVolunteer,
                inputStatus.pizzaOnly,
                inputStatus.cuisines
            )
        );
    }, [events, inputStatus]);

    return (
        <div className="relative mt-24 mb-[400px]">
            <Container>
                <div className="fixed z-50 -bottom-6 sm:bottom-4 -right-8 scale-75 sm:scale-100 sm:min-w-[500px] sm:right-4 bg-white sm:m-2 rounded-lg p-4 drop-shadow-xl border-2 border-gray-500">
                    <Typography align="center" variant="h4">
                        Filter Events
                    </Typography>

                    <div className="mt-2 mb-2">
                        <Divider />
                    </div>

                    <Stack direction="row">
                        <div>
                            <Stack>
                                <Typography variant="h6">General Filters</Typography>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            onChange={(e) =>
                                                setInputStatus({
                                                    ...inputStatus,
                                                    onCampusOnly: e.target.checked,
                                                })
                                            }
                                            checked={inputStatus.onCampusOnly}
                                        />
                                    }
                                    label="In Person Events"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
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
                                <FormControlLabel
                                    control={
                                        <Switch
                                            onChange={(e) =>
                                                setInputStatus({
                                                    ...inputStatus,
                                                    pizzaOnly: e.target.checked,
                                                })
                                            }
                                            checked={inputStatus.pizzaOnly}
                                        />
                                    }
                                    label="Pizza Events only"
                                />
                            </Stack>
                        </div>

                        <div className="w-full">
                            <Typography variant="h6">Filter by Cuisine</Typography>

                            <div className="sm:w-min-[400px]">
                                <Autocomplete
                                    multiple
                                    options={cuisines}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Cuisine"
                                            variant="outlined" // Use outlined variant for better visibility
                                            fullWidth // Take up the full width of the container
                                        />
                                    )}
                                    onChange={(_, value) => {
                                        setInputStatus({ ...inputStatus, cuisines: value });
                                    }}
                                />
                            </div>
                        </div>
                    </Stack>
                </div>
            </Container>

            <Container maxWidth="lg">
                {shownEvents.length > 1 ? (
                    <div className="-mt-4 sm:mt-0">
                    <Events events={shownEvents} /></div>
                ) : (
                    <Skeleton variant="rectangular" width="100%" height="100%" />
                )}
            </Container>
        </div>
    );
}
