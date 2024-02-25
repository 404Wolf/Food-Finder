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
        <div className="flex justify-stretch justify-items-center relative h-full mb-8">
            <StyledCard className="flex-row h-[12rem] pb-[10px]">
                <div className="relative h-full p-2">
                    <Typography variant="h6" className="text-center rounded-lg">
                        {truncateString(props.eventInfo.name, 50)}

                        <Typography
                            sx={{
                                fontSize: "1rem",
                                color: "gray",
                            }}
                        >
                            (Cuisine:{" "}
                            {toTitleCase(props.eventInfo.food.cuisine.replaceAll('"', ""))})
                        </Typography>
                    </Typography>

                    <div className="mt-1"></div>

                    <a href={url} target="_blank" rel="noopener noreferrer" className="basis-3/5">
                        <CardContent>
                            <div className="float-right ml-1">
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

                            <div className="-mb-4">
                                <Rating
                                    name="simple-controlled"
                                    value={props.eventInfo.food.rating / 2}
                                    precision={0.5}
                                    readOnly
                                />

                                <div className="mb-2">
                                <Typography>
                                    {truncateString(props.eventInfo.food.description, 240)}
                                </Typography></div>

                                <p
                                    style={{ lineHeight: "-1rem", fontSize: "11px" }}
                                    className="absolute right-2 -bottom-1 max-w-[30%]"
                                >
                                    @{props.eventInfo.location.name}
                                </p>

                                <div className="flex-col absolute -bottom-1 left-1 justify-items-left justify-left gap-2">
                                    <div className="pb-1">
                                        <Chip label={niceDate} variant="outlined" size="small" />
                                    </div>

                                    <div className="flex justify-between justify-items-left justify-left gap-2">
                                        {(props.eventInfo.food.volunteer as any as string) && (
                                            <Chip
                                                label="Volunteer"
                                                variant="outlined"
                                                size="small"
                                            />
                                        )}

                                        {(props.eventInfo.food.onCampus as any as string) && (
                                            <Chip
                                                label="On Campus"
                                                variant="outlined"
                                                size="small"
                                            />
                                        )}

                                        <Chip label="Free" variant="outlined" size="small" />

                                        <div className="grow"></div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </a>
                </div>
            </StyledCard>
        </div>
    );
}
