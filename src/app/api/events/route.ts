import { mongoConnect } from "@/utils/mongoConnect";

export const GET = async (): Promise<Response> => {
    const { db, client } = await mongoConnect();
    const collection = db.collection("events");
    const events = await collection.find({}).toArray();
    client.close();

    return Response.json({ success: true, data: events });
};
