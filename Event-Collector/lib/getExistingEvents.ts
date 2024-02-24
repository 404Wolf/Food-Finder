import { mongoConnect } from "./mongoConnect";
import { FoodEvent } from "../Event";

export default async function getExistingEvents() {
    const { db, client } = await mongoConnect();
    const collection = db.collection("events");
    const events = await collection.find({}, { projection: { _id: 1 } }).toArray();
    client.close();
    return events as any as string[];
}
