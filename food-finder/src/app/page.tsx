import { EventsArea } from "@/components/events/EventsArea";
import Appbar from "@/components/Appbar";

export default async function Home() {
    /*
    async function getEvents() {
        "use server";
        const res = await fetch("http://localhost:3000/api/events");
        const data = await res.json();
        return data.data;
    }

    async function getCuisines() {
        "use server";
        const res = await fetch("http://localhost:3000/api/events/cuisines");
        const data = await res.json();
        return data.data;
    }
    */

    return (
        <>
            <Appbar />
            <EventsArea />
        </>
    );
}
