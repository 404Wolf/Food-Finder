import { mongoConnect } from "./mongoConnect";

export default async function sendFinalMetadata () {
    const { db, client } = await mongoConnect();
    const metadataCollection = db.collection("metadata");
    metadataCollection.updateOne({}, { $set: { lastUpdated: new Date() } });
}