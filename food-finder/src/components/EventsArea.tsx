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
        eventsFiltered = eventsFiltered.filter(
            (event) => (event.food.volunteer as unknown as string) === "false"
        );
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
        return filterEvents(
            sortEvents(
                events.filter((eventInfo: FoodEvent) => {
                    return eventInfo !== undefined;
                }) as FoodEvent[]
            ),
            inputStatus.onCampusOnly,
            inputStatus.excludeVolunteer,
            inputStatus.pizzaOnly,
            inputStatus.cuisines
        );
    }, [events, inputStatus]);

    return (
        <div className="relative mt-24 mb-[400px]">
            <div
                className="fixed z-50 bottom-4 right-4 bg-white m-2 rounded-lg p-4 drop-shadow-xl border-2 border-gray-500"
                style={{ transform: "scale(0.9)", transformOrigin: "bottom right" }}
            >
                <Typography align="center" variant="h4">
                    Filter Events
                </Typography>

                <div className="mt-2 mb-2">
                    <Divider />
                </div>

                <Stack direction="row">
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

                    <Paper
                        variant="outlined"
                        style={{
                            border: "2px #aaa",
                            backgroundColor: "transparent",
                        }}
                    >
                        <Typography variant="h6">Filter by Cuisine</Typography>

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
                            style={{ minWidth: 400 }} // Set a minimum width to ensure readability
                        />
                    </Paper>
                </Stack>
            </div>

            <Container maxWidth="lg">
                {shownEvents.length > 1 ? (
                    <Events events={shownEvents} />
                ) : (
                    <Skeleton variant="rectangular" width="100%" height="100%" />
                )}
            </Container>
        </div>
    );
}
