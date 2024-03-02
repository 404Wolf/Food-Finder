import { mongoConnect } from "@/utils/mongoConnect";
import { Collection } from "mongodb";

export async function GET() {
    const { db, client } = await mongoConnect();
    const collection = (await db.collection("events")) as Collection<Event>;

    // Get a list of all the cuisines of the events in the database
    const cuisines = await collection.distinct("food.cuisine");
    client.close();

    return Response.json({
        success: true,
        data: cuisines,
    });
}
