import Image from "next/image";
import EventCard from "../components/EventCard";
import { EventsArea } from "@/components/EventsArea";
import { AppBar, Container } from "@mui/material";

export default async function Home() {
    return (
        <>
            <AppBar position="static">Free food finder!</AppBar>
            <Container maxWidth="lg">
                <EventsArea />
            </Container>
        </>
    );
}
