import { EventFilters, getAllEvents } from "@/utils/getAllEvents";

export const GET = async (request: Request): Promise<Response> => {
    const params = new URL(request.url).searchParams;

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
    
    return Response.json({
        success: true,
        data: await getAllEvents(filters as EventFilters),
    });
};
