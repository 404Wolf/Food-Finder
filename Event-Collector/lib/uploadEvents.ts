import { mongoConnect } from "./mongoConnect";
import { FoodEvent } from "../Event";

export async function uploadEvent(event: FoodEvent) {
    const { db, client } = await mongoConnect();
    const collection = db.collection("events");
    await collection.insertOne(event);
    client.close();
}

export async function uploadEvents(events: FoodEvent[]) {
    const { db, client } = await mongoConnect();
    const collection = db.collection("events");
    await collection.insertMany(events);
    client.close();
}
