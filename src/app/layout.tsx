import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Provider from "@/providers/provider";
import { Header, Footer, Sidebar } from "@/components/layout";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: {
        default: "DarshanTube",
        template: "%s - DarshanTube",
    },
    description: "DarshanTube is a video streaming platform that provides streaming functionality",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Provider>
                    <div className="flex flex-col min-h-screen h-auto">
                        <Header />
                        <div className="flex flex-1 overflow-hidden">
                            <Sidebar />
                            <main className="flex-1 overflow-auto">{children}</main>
                        </div>
                        <Footer />
                    </div>
                </Provider>
            </body>
        </html>
    );
}
