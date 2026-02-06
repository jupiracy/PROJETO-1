import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BackButton from "@/components/BackButton";
import { LanguageProvider } from "@/context/LanguageContext";

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
                <LanguageProvider>
                    <BackButton />
                    {children}
                </LanguageProvider>
            </body>
        </html>
    );
}
