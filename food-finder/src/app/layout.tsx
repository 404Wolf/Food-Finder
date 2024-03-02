import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { Analytics } from "@vercel/analytics/react";
import theme from "@/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Free Food Finder",
    description: "Hack CWRU 2024 Project",
    icons: {
        icon: "/icon.ico",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <script src="https://unpkg.com/react@16.0.0/umd/react.production.min.js"></script>
            <script src="https://unpkg.com/react-copy-to-clipboard/build/react-copy-to-clipboard.js"></script>
            <link rel="icon" href="/favicon.ico" sizes="any" />

            <ThemeProvider theme={theme}>
                <AppRouterCacheProvider options={{ key: "css" }}>
                    <body className={inter.className}> {children} </body>
                </AppRouterCacheProvider>
            </ThemeProvider>

            <Analytics />
        </html>
    );
}
