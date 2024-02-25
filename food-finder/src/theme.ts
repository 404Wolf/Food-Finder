"use client";

import { ThemeOptions, createTheme } from "@mui/material/styles";

const theme: ThemeOptions = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#003071",
        },
        secondary: {
            main: "#f50057",
        },
    },
    typography: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', // Use Roboto as an example font
        fontSize: 11, // Set a smaller default font size
      },
});

export default theme;
