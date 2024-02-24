import Image from "next/image";
import EventCard from "../components/EventCard";
import Event from "../app/models/Event";
import Events from "../components/Events";

export default async function Home() {

    return (
        <div>
            <Events />
        </div>
    );
}
