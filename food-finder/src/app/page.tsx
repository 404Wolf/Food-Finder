import { EventsArea } from "@/components/events/EventsArea";
import Appbar from "@/components/Appbar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Food Finder",
    applicationName: "Food Finder",
    description: "Find Case Western University events that offer food",
    keywords: "Case Western, food, events, free, CWRU, university",
    abstract:
        "Tool to locate free food at Case Western Reserve University by analyzing all events on campus and filtering them by whether they offer food and of what type.",
};

export default async function Home() {
    return (
        <>
            <Appbar />
            <EventsArea />
        </>
    );
}
