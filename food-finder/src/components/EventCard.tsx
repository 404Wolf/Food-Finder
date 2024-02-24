"use client";

import React from "react";
import Event from "@/app/models/Event";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  width: "70%",
  backgroundColor: "rgb(15 23 42)",
  margin: "20px",
  color: "white",
  transition: "transform 0.15s ease-in-out",
  "&:hover": {
    transform: "scale3d(1.05, 1.05, 1)",
  },
}));

export default function EventCard(props: { event: Event }) {
  const { event: caseEvent, foodInfo }: Event = props.event;

  const date = new Date(caseEvent.time);

  const niceDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const url = `https://community.case.edu/rsvp?id=${caseEvent._id}`;

  return (
    <div className="flex justify-center items-center justify-items-center">
      <StyledCard className="m-20">
        <a href={url} target="_blank" rel="noopener noreferrer">
          <CardContent>
            <Typography variant="h5" component="h2">
              {caseEvent.name}
            </Typography>
            <Typography color="subtitle1">{niceDate}</Typography>
            <Typography variant="body2" component="p">
              {caseEvent.description}
            </Typography>
            <div className="flex justify-center items-center justify-items-center">
            <CardMedia
              component="img"
              sx={{
                width: "50%",
                height: "100%",
                borderRadius: "10px",
                marginTop: "2rem",
                marginBottom: "2rem",
              }}
              image={caseEvent.bannerSrc[0]}
              alt={caseEvent.name}
            />
            </div>
            <Typography>Food Rating: {foodInfo.rating}/10</Typography>
            <Typography>Description: {foodInfo.description}</Typography>
            <Typography>Cuisine: {foodInfo.cuisine}</Typography>
            <Typography>
              Volunteer: {foodInfo.volunteer ? "Yes" : "No"}
            </Typography>
          </CardContent>
        </a>
      </StyledCard>
    </div>
  );
}
