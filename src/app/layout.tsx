import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Free Food Finder",
    description: "Hack CWRU 2024 Project",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <ThemeProvider theme={theme}>
                <AppRouterCacheProvider options={{ key: "css" }}>
                    <body className={inter.className}> {children} </body>
                </AppRouterCacheProvider>
            </ThemeProvider>
        </html>
    );
}
