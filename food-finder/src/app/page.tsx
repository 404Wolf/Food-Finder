import Image from "next/image";
import EventCard from "../components/EventCard";
import { EventsArea } from "@/components/EventsArea";
import { Container } from "@mui/material";
import Appbar from "@/components/Appbar";

export default async function Home() {
    return (
        <>
            <EventsArea />
        </>
    );
}
