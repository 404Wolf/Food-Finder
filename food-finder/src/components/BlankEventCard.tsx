import {
    Card,
    CardContent,
    Typography,
    CardMedia,
    Rating,
    Chip,
    Tooltip,
    Skeleton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Event } from "@/models/Event";
import { toTitleCase } from "@/utils/misc";
import { StyledEventCard } from "./events/EventCard";

export default function BlankEventCard(props: { eventInfo: Event }) {
    return (
        <div className="flex justify-stretch justify-items-center relative h-full mb-8">
            <StyledEventCard className="flex-row h-[12rem] pb-[10px]">
                <div className="relative h-full p-2">
                    <Skeleton
                        animation="wave"
                        height={50}
                        width="90%"
                        style={{ marginBottom: 5, marginLeft: 15 }}
                    />

                    <div className="mt-1"></div>

                    <CardContent>
                        <div className="float-right ml-1">
                            <Skeleton
                                variant="rectangular"
                                width={140}
                                height={100}
                                style={{ marginBottom: 6, borderRadius: 10, marginRight: 6 }}
                            />
                        </div>

                        <div className="-mb-4">
                            <Skeleton
                                animation="wave"
                                height={40}
                                width="80%"
                                style={{ marginBottom: 6 }}
                            />

                            <div className="flex-col absolute -bottom-1 left-1 justify-items-left justify-left gap-2">
                                <div className="flex justify-between justify-items-left justify-left gap-2">
                                    <Chip
                                        label="&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"
                                        size="small"
                                    />

                                    <Chip
                                        label="&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"
                                        size="small"
                                    />

                                    <div className="grow"></div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </div>
            </StyledEventCard>
        </div>
    );
}
