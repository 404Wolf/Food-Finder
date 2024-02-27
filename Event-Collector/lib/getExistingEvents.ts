import { mongoConnect } from "./mongoConnect";
import { Event } from "../Event";

export default async function getExistingEvents(): Promise<Event[]> {
    const { db, client } = await mongoConnect();
    const collection = db.collection("events");
    const events = await collection.find({}, { projection: { _id: 1 } }).toArray();
    client.close();
    return events as unknown as Event[];
}
