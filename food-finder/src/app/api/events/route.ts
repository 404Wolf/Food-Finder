import { FoodEvent } from "@/models/Event";
import { mongoConnect } from "@/utils/mongoConnect";

export const GET = async (): Promise<Response> => {
    const { db, client } = await mongoConnect();
    const collection = db.collection("events");
    const temp: any = await collection.find({}).toArray();
    let events = temp as FoodEvent[];
    events = events.filter((event) => {
        return event.food.rating > 0 && event.event.date > new Date();
    });
    client.close();

    return Response.json({ success: true, data: events });
};
