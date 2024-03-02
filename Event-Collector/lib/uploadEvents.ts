import { mongoConnect } from "./mongoConnect";
import { Event } from "../Event";

export async function uploadEvent(event: Event) {
    const { db, client } = await mongoConnect();
    const collection = db.collection("events");
    await collection.insertOne(event as any);
    client.close();
}

export async function uploadFailure(failure: { _id: number }) {
    const { db, client } = await mongoConnect();
    const collection = db.collection("failures");
    await collection.insertOne(failure as any);
    client.close();
}
