import { mongoConnect } from "./mongoConnect";
import { FoodEvent } from "../Event";

export async function uploadEvent(event: FoodEvent) {
    const { db, client } = await mongoConnect();
    const collection = db.collection("events");
    await collection.insertOne(event as any);
    client.close();
}

export async function uploadEvents(events: FoodEvent[]) {
    const { db, client } = await mongoConnect();
    const collection = db.collection("events");
    await collection.insertMany(events as any);
    client.close();
}
