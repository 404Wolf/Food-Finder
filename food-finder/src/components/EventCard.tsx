"use client";

import React, { useState } from "react";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FoodEvent } from "@/models/Event";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const StyledCard = styled(Card)(({ theme }) => ({
    width: "70%",
    backgroundColor: "rgb(15 23 42)",
    color: "white",
}));

export default function EventCard(props: { eventInfo: FoodEvent }) {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const date = new Date(props.eventInfo.date);
    const niceDate = date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    const url = `https://community.case.edu/rsvp?id=${props.eventInfo._id}`;

    return (
        <div className="flex justify-center items-center justify-items-center relative">
            <StyledCard className="flex m-5">
                <a href={url} target="_blank" rel="noopener noreferrer" className="grow">
                    <CardContent>
                        <div>
                            <Typography>Food Rating: {props.eventInfo.food.rating}/10</Typography>

                            <Typography>
                                Description: {props.eventInfo.food.description}
                            </Typography>

                            <Typography>Cuisine: {props.eventInfo.food.cuisine}</Typography>

                            <Typography>
                                Volunteer: {props.eventInfo.food.volunteer ? "Yes" : "No"}
                            </Typography>
                        </div>

                        {expanded && (
                            <div>
                                <Typography variant="h5" component="h2">
                                    {props.eventInfo.name}
                                </Typography>

                                <Typography color="subtitle1">{niceDate}</Typography>

                                <Typography variant="body2" component="p">
                                    {props.eventInfo.description}
                                </Typography>

                                <Typography>Location: {props.eventInfo.location.name}</Typography>
                            </div>
                        )}
                    </CardContent>
                </a>

                <div className="max-h-20 m-5">
                    <CardMedia
                        component="img"
                        sx={{
                            width: "30%",
                            height: "100%",
                            borderRadius: "10px",
                        }}
                        image={props.eventInfo.bannerSrc}
                        alt={props.eventInfo.name}
                    />
                </div>
            </StyledCard>
        </div>
    );
}
