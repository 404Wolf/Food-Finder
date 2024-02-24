import { MongoClient } from "mongodb";

export async function mongoConnect() {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        throw new Error("MONGODB_URI is not defined");
    }

    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db("freefood");
    return { db: database, client: client };
}
