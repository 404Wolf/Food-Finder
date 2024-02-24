import Event from "@/app/models/Event";
import { mongoConnect } from "@/utils/mongoConnect";

export const GET = async (): Promise<Response> => {
  const { db, client } = await mongoConnect();
  const collection = db.collection("events");
  const temp: any = await collection.find({}).toArray();
  let events = temp as Event[];
  events = events.filter((event) => {
    return event.foodInfo.rating > 0;
  });
  client.close();

  return Response.json({ success: true, data: events });
};
