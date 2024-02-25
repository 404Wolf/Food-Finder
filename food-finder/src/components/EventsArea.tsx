"use client";

import React, { useState, useEffect } from "react";
import { FoodEvent } from "@/models/Event";
import Events from "./Events";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

function filterEvents(
  events: FoodEvent[],
  inPersonOnly: boolean,
  excludeVolunteer: boolean
) {
  let eventsFiltered = events;
  if (inPersonOnly && excludeVolunteer) {
    eventsFiltered = events.filter((event) => {
      return (
        event.location.name !== "Online Event" && event.food.volunteer === false
      );
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

export function EventsArea() {
  const [events, setEvents] = useState<FoodEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<FoodEvent[]>([]);
  const [inPersonOnly, setInPersonOnly] = useState(false);
  const [excludeVolunteer, setExcludeVolunteer] = useState(false);

  useEffect(() => {
    setFilteredEvents(events);
  }, [events]);

  useEffect(() => {
    filterEvents(events, inPersonOnly, excludeVolunteer);
  }, [inPersonOnly, excludeVolunteer]);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setEvents(
          data.data.filter((eventInfo: FoodEvent) => {
            return eventInfo !== undefined;
          }) as FoodEvent[]
        );
      })
      .catch((err) => console.error(err));
  }, []);

  console.log(filteredEvents);

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={inPersonOnly}
            onChange={(e) => setInPersonOnly(e.target.checked)}
          />
        }
        label="In Person Only"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={excludeVolunteer}
            onChange={(e) => setExcludeVolunteer(e.target.checked)}
          />
        }
        label="Exclude Volunteer Events"
      />
      <Events events={filteredEvents} />
    </>
  );
}
