import getExistingEvents from "./getExistingEvents";
import { mongoConnect } from "./mongoConnect";

export default async function sendFinalMetadata () {
    const { db, client } = await mongoConnect();
    const metadataCollection = db.collection("metadata");
    metadataCollection.insertOne({ lastUpdated: new Date() });
}