"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Event } from "@/models/Event";
import Events from "./Events";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
    Autocomplete,
    Divider,
    Skeleton,
    Stack,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import { Container } from "@mui/material";
import BlankEventCard from "../BlankEventCard";

interface InputStatus {
    onCampusOnly: boolean;
    excludeVolunteer: boolean;
    pizzaOnly: boolean;
    cuisines?: string[];
}

const LOADING_SKELETON_COUNT = 20;

export function EventsArea() {
    const [inputStatus, setInputStatus] = useState<InputStatus>({
        onCampusOnly: false,
        excludeVolunteer: false,
        pizzaOnly: false,
    });

    const [cuisines, setCuisines] = useState<string[]>([]);
    useEffect(() => {
        fetch("/api/events/cuisines")
            .then((resp) => resp.json())
            .then((data) => setCuisines(data.data));
    }, []);

    const [events, setEvents] = useState<Event[]>([]);
    useEffect(() => {
        const filters = new URLSearchParams();
        if (inputStatus.onCampusOnly) {
            filters.set("inPersonOnly", "true");
        }
        if (inputStatus.excludeVolunteer) {
            filters.set("noVolunteer", "true");
        }
        if (inputStatus.pizzaOnly) {
            filters.set("pizzaOnly", "true");
        }
        if (inputStatus.cuisines) {
            filters.set("cuisines", inputStatus.cuisines.join(","));
        }
        filters.set("minRating", "1");
        filters.set("afterDate", new Date().toISOString());

        fetch(`/api/events?${filters.toString()}`)
            .then((resp) => resp.json())
            .then((data) => {
                setEvents(data.data);
            });
    }, [inputStatus]);

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
                            <Stack gap="5px">
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
                <div className="-mt-4 sm:mt-0">
                    {events.length > 1 ? <Events events={events} /> : <Events />}
                </div>
            </Container>
        </div>
    );
}
