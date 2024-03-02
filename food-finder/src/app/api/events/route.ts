import { EventFilters, getAllEvents } from "@/utils/getAllEvents";
import { parseEventFilters } from "@/utils/parseEventFilters";

export const GET = async (request: Request): Promise<Response> => {
    return Response.json({
        success: true,
        data: await getAllEvents(parseEventFilters(request.url)),
    });
};
