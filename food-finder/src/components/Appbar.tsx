import React from "react";
import { AppBar, Toolbar, Typography, Container, Box } from "@mui/material";
import Image from "next/image";
import IcalButton from "./IcalButton";

const App = () => {
    return (
        <div className="flex-col">
            <div>
                <AppBar position="fixed" style={{ background: "#003071" }}>
                    <Toolbar>
                        <Container maxWidth="xl" className="container relative">
                            <div className="h-0 overflow-visible -translate-x-32 hidden sm:block">
                                <Box
                                    component={"img"}
                                    src="/caseLogo.jpeg"
                                    alt="CWRU logo"
                                    sx={{
                                        height: "60px",
                                    }}
                                />
                            </div>

                            <Typography
                                variant="h2"
                                align="center"
                                sx={{
                                    color: "white",
                                    minHeight: "20px",
                                    marginTop: { xs: "0px", md: "2px" },
                                    marginBottom: { xs: "0px", md: "2px" },
                                    fontSize: { xs: "1.2rem", md: "3rem" },
                                }}
                                fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
                            >
                                Find free food @CWRU!
                            </Typography>
                        </Container>
                    </Toolbar>

                    <div className="scale-[200%] fixed top-4 right-8">
                        <IcalButton />
                    </div>

                    <a
                        href="https://github.com/404Wolf/Food-Finder"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="z-50 hidden sm:block"
                    >
                        <div className="overflow-visible h-max fixed transition duration-200 -left-24 -bottom-24  hover:-bottom-22 -translate-y-1 -translate-x-1 scale-[50%] hidden sm:block">
                            <Image
                                src="/logo.webp"
                                alt="Our logo"
                                width={400}
                                height={400}
                                className="h-full"
                            />
                        </div>
                    </a>
                </AppBar>
            </div>
        </div>
    );
};

export default App;
