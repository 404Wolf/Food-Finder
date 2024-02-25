"use client";

import React, { useState } from "react";
import { Card, CardContent, Typography, CardMedia, Rating, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FoodEvent } from "@/models/Event";
import { toTitleCase } from "@/utils/misc";

const StyledCard = styled(Card)(({ theme }) => ({
    height: "100%",
    width: "100%",
    borderRadius: "10px",
    transition: "transform 0.08s ease-in-out",
    "&:hover": {
        transform: "scale3d(1.05, 1.05, 1)",
    },
}));

function truncateString(input: string, charsToKeep: number): string {
    if (input.length <= charsToKeep) {
        return input;
    }

    let truncatedString = input.substr(0, charsToKeep);
    const lastSpaceIndex = truncatedString.lastIndexOf(" ");

    if (lastSpaceIndex !== -1) {
        truncatedString = truncatedString.substr(0, lastSpaceIndex);
    }

    return truncatedString + "...";
}

export default function EventCard(props: { eventInfo: FoodEvent }) {
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
        <div className="flex justify-stretch justify-items-center relative h-full mb-3">
            <StyledCard className="flex-row h-[12rem] pb-[10px]">
                <div className="relative h-full p-2">
                    <Typography variant="h6" className="text-center rounded-lg">
                        {truncateString(props.eventInfo.name, 50)}

                        <Typography>
                            ({toTitleCase(props.eventInfo.food.cuisine.replaceAll('"', ""))})
                        </Typography>
                    </Typography>

                    <div className="mt-5"></div>

                    <a href={url} target="_blank" rel="noopener noreferrer" className="basis-3/5">
                        <CardContent>
                            <div className="relative">
                                <div className="float-right">
                                    <CardMedia
                                        className="rounded-md max-w-36 ml-3 mb-3 border-2 border-gray-300"
                                        component="img"
                                        image={
                                            props.eventInfo.bannerSrc === "about:blank"
                                                ? "/placeholder.webp"
                                                : props.eventInfo.bannerSrc
                                        }
                                        alt={props.eventInfo.name}
                                    />
                                </div>
                                <div className="absolute bottom-0 right-0 scale-[120%]">
                                    <Typography variant="caption" className="text-center">
                                        @{props.eventInfo.location.name}
                                    </Typography>
                                </div>
                            </div>

                            <div className="-mb-4">
                                <Rating
                                    name="simple-controlled"
                                    value={props.eventInfo.food.rating / 2}
                                    precision={0.5}
                                    readOnly
                                />

                                <Typography>
                                    {truncateString(props.eventInfo.food.description, 200)}
                                </Typography>

                                <div className="flex justify-between justify-items-center absolute -bottom-1 left-1">
                                    <Chip label={niceDate} variant="outlined" size="small" />
                                    {(props.eventInfo.food.volunteer as any as string) ===
                                        "true" && (
                                        <Chip label="Volunteer" variant="outlined" size="small" />
                                    )}

                                    <Chip label="Free" variant="outlined" size="small" />
                                </div>
                            </div>
                        </CardContent>
                    </a>
                </div>
            </StyledCard>
        </div>
    );
}
