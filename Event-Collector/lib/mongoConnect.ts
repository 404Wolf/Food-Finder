import { MongoClient } from "mongodb";
import { config } from "dotenv";

export async function mongoConnect() {
    const uri = config().parsed?.MONGODB_URI;

    if (!uri) {
        throw new Error("MONGODB_URI is not defined");
    }

    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db(process.env.EVENT_DATABASE_NAME);
    return { db: database, client: client };
}
