import { mongoConnect } from "./mongoConnect";
import { Event } from "../models/Event";
import { Collection, Filter } from "mongodb";

export interface EventFilters {
    afterDate?: Date;
    minRating?: number;
    pizzaOnly?: boolean;
    noVolunteer?: boolean;
    cuisines?: string[];
    inPersonOnly?: boolean;
}

function toTitleCase(str: string) {
    return str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
}

export async function getAllEvents(filters: EventFilters = {}) {
    const { db, client } = await mongoConnect();
    const collection = (await db.collection("events")) as Collection<Event>;

    const query: any = {};
    if (filters.afterDate) {
        query.date = { $gte: filters.afterDate };
    }
    if (filters.minRating) {
        query["food.rating"] = { $gte: filters.minRating };
    }
    if (filters.noVolunteer) {
        query["food.volunteer"] = false;
    }
    if (filters.inPersonOnly) {
        query.onCampus = false;
    }
    if (filters.pizzaOnly) {
        if (filters.cuisines) {
            query["food.cuisine"] = { $in: [...filters.cuisines.map(toTitleCase), "Pizza"] };
        } else {
            query["food.cuisine"] = "Pizza";
        }
    } else if (filters.cuisines) {
        query["food.cuisine"] = { $in: filters.cuisines.map(toTitleCase) };
    }

    // Fetch all events from the database and only include events that haven't happened yet;
    // and events that are food rating > 0
    const events = await collection.find(query).toArray();
    client.close();

    return events;
}
