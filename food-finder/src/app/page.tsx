import Image from "next/image";
import EventCard from "../components/EventCard";
import { EventsArea } from "@/components/EventsArea";
import { Container } from "@mui/material";

export default async function Home() {
    return (
        <Container>
            <EventsArea />
        </Container>
    );
}
