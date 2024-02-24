"use client";

import React from "react";
import Event from "@/app/models/Event";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: "rgb(15 23 42)",
  margin: "20px",
  color: "white",
}));

export default function EventCard(props: { event: Event }) {
  const { event: caseEvent, foodInfo }: Event = props.event;

  return (
    <StyledCard className="m-20">
      <CardContent>
        <Typography variant="h5" component="h2">
          {caseEvent.name}
        </Typography>
        <Typography color="subtitle1">{caseEvent.time}</Typography>
        <Typography variant="body2" component="p">
          {caseEvent.description}
        </Typography>
        <CardMedia
          component="img"
          sx={{
            width: "100%",
            borderRadius: "10px",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
          image={caseEvent.bannerSrc[0]}
          alt={caseEvent.name}
        />
        <Typography>Food Rating: {foodInfo.rating}/10</Typography>
        <Typography>Description: {foodInfo.description}</Typography>
        <Typography>Cuisine: {foodInfo.cuisine}</Typography>
        <Typography>Volunteer: {foodInfo.volunteer ? "Yes" : "No"}</Typography>
      </CardContent>
    </StyledCard>
  );
}
