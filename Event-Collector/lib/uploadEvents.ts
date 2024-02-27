import { mongoConnect } from "./mongoConnect";
import { Event } from "../Event";

export async function uploadEvent(event: Event) {
    const { db, client } = await mongoConnect();
    const collection = db.collection("events");
    await collection.insertOne(event as any);
    client.close();
}
