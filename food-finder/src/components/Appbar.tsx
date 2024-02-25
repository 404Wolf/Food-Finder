import React from "react";
import { AppBar, Toolbar, Typography, Container, Box } from "@mui/material";
import Image from "next/image";

const App = () => {
    return (
        <div className="flex-col">
            <div>
                <AppBar position="fixed" style={{ background: "#003071" }}>
                    <Toolbar>
                        <Container maxWidth="xl">
                            <div>
                                <div className="overflow-visible h-max absolute -left-16 -top-2 scale-[70%] hidden sm:block">
                                    <Image
                                        src="/caseLogo.jpeg"
                                        alt="CWRU logo"
                                        width={300}
                                        height={300}
                                        className="h-full"
                                    />
                                </div>

                                <Typography
                                    variant="h2"
                                    align="center"
                                    marginTop="5px"
                                    marginBottom="5px"
                                    sx={{ color: "white" }}
                                    fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
                                >
                                    Find free food @CWRU!
                                </Typography>

                                <div className="overflow-visible h-max fixed -left-24 -bottom-24 -translate-y-1 -translate-x-1 scale-[50%] hidden sm:block">
                                    <Image
                                        src="/logo.webp"
                                        alt="Our logo"
                                        width={400}
                                        height={400}
                                        className="h-full"
                                    />
                                </div>
                            </div>
                        </Container>
                    </Toolbar>
                </AppBar>
            </div>
            <Box mt={12} textAlign="center">
                <Typography align="center" color="black">
                    Find free food on campus! Below is a listing of events on campus that claim to
                    offer free food.
                </Typography>
            </Box>
        </div>
    );
};

export default App;
