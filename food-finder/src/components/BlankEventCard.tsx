import {
    CardContent,
    Skeleton,
    Stack,
} from "@mui/material";
import { StyledEventCard } from "./events/EventCard";

export default function BlankEventCard() {
    return (
        <div className="flex justify-stretch justify-items-center relative h-full mb-8">
            <StyledEventCard className="flex-row h-[12rem] pb-[10px]">
                <div className="relative h-full p-2">
                    <Skeleton
                        height={50}
                        width="90%"
                        style={{ marginBottom: 5, marginLeft: 15, borderRadius: 10 }}
                    />

                    <div className="mt-1"></div>

                    <CardContent>
                        <Stack spacing={2} direction="row">
                            <Skeleton
                                variant="rectangular"
                                width="60%"
                                height={110}
                                sx={{ borderRadius: 4 }}
                                style={{ marginBottom: 6, marginRight: 6 }}
                            />

                            <Skeleton
                                variant="rectangular"
                                width="40%"
                                height={110}
                                sx={{ borderRadius: 4 }}
                                style={{ marginBottom: 6, marginRight: 6 }}
                            />

                            <div className="flex-col absolute bottom-3 left-2 justify-items-left justify-left gap-2">
                                <div className="flex justify-between justify-items-left justify-left gap-2">
                                    {Array.from({
                                        length: Math.floor(Math.random() * 3) + 1,
                                    }).map((_, index) => (
                                        <Skeleton
                                            key={index}
                                            variant="rectangular"
                                            sx={{ borderRadius: 10 }}
                                            width={80}
                                            height={24}
                                        />
                                    ))}
                                    <div className="grow"></div>
                                </div>
                            </div>
                        </Stack>
                    </CardContent>
                </div>
            </StyledEventCard>
        </div>
    );
}
