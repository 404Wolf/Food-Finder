import { EventFilters } from "./getAllEvents";

export function parseEventFilters(queryString: string): EventFilters {
    const params = new URL(queryString).searchParams;

    const filters: any = {};
    if (params.get("inPersonOnly") === "true") {
        filters.inPersonOnly = true;
    }
    if (params.get("noVolunteer") === "true") {
        filters.noVolunteer = true;
    }
    if (params.get("pizzaOnly") === "true") {
        filters.pizzaOnly = true;
    }
    if (params.get("cuisines")) {
        filters.cuisines = params.get("cuisines")?.split(",");
    }
    if (params.get("minRating")) {
        filters.minRating = parseInt(params.get("minRating")!);
    }

    return filters;
}
