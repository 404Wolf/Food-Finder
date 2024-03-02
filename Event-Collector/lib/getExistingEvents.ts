import { mongoConnect } from "./mongoConnect";

export default async function getExistingEvents(): Promise<Set<string>> {
    const { db, client } = await mongoConnect();

    const successCollection = db.collection("events");
    const successIds = (await successCollection.distinct("_id")).map((x) =>
        x.toString()
    ) as string[];
    const failuresCollection = db.collection("failures");
    const failureIds = (await failuresCollection.distinct("_id")).map((x) =>
        x.toString()
    ) as string[];

    client.close();

    return new Set([...successIds, ...failureIds]);
}
