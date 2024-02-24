"use client";

import React from "react";
import Event from "@/app/models/Event";
import { Card, CardContent, Typography } from "@mui/material";

export default function EventCard(props: { event: Event }) {
    const { event: caseEvent, foodInfo }: Event = props.event;

    // const dateString = caseEvent.time;
    // console.log(dateString);
    // const formattedDate = `${dateString.slice(0, 4)}-${dateString.slice(4, 6)}-${dateString.slice(
    //     6,
    //     8
    // )}T${dateString.slice(9, 11)}:${dateString.slice(11, 13)}:${dateString.slice(13, 15)}`;
    // const date = new Date(formattedDate);
    // const datetimeStr = date.toLocaleDateString() + " " + date.toLocaleTimeString();

    // console.log(date);

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {caseEvent.name}
                </Typography>
                <Typography color="textSecondary">{caseEvent.time}</Typography>
                <Typography variant="body2" component="p">
                    {caseEvent.description}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Food Information:
                </Typography>
                <Typography>Rating: {foodInfo.rating}/10</Typography>
                <Typography>Description: {foodInfo.description}</Typography>
                <Typography>Cuisine: {foodInfo.cuisine}</Typography>
                <Typography>Volunteer: {foodInfo.volunteer ? "Yes" : "No"}</Typography>
            </CardContent>
        </Card>
    );
}
