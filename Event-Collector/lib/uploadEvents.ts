import { mongoConnect } from "./mongoConnect";
import { Event } from "../Event";

export async function uploadEvent(event: Event) {
    const { db, client } = await mongoConnect();
    const collection = db.collection("events");
    try {
        await collection.insertOne(event as any);
    } catch {}
    client.close();
}

export async function uploadFailure(failure: { _id: number }) {
    const { db, client } = await mongoConnect();
    const collection = db.collection("failures");
    try {
        await collection.insertOne(failure as any);
    } catch {}
    client.close();
}
