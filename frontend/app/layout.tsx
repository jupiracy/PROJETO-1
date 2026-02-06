import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BackButton from "@/components/BackButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Drum School Platform",
    description: "Learn to drum like a pro",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <BackButton />
                {children}
            </body>
        </html>
    );
}
