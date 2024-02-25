import React from "react";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";

const App = () => {
    return (
        <div>
            <AppBar position="fixed" style={{ background: "#f0f0f0" }}>
                <Toolbar>
                    <Container>
                        <Typography
                            variant="h2"
                            align="center"
                            sx={{ color: "black" }}
                        >
                            Find free food @CWRU!
                        </Typography>
                    </Container>
                </Toolbar>
            </AppBar>

            {/* Add your main content here */}
            <Container style={{ marginTop: "80px" }}>
                {/* Your content goes here */}
                <Typography variant="body1">
                    Welcome to the app where you can get free food!
                    {/* Add more content as needed */}
                </Typography>
            </Container>
        </div>
    );
};

export default App;
