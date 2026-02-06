"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
    const { t } = useLanguage();

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-black to-zinc-900 text-white relative">
            <div className="absolute top-8 right-8 z-50">
                <LanguageSelector />
            </div>
            <div className="z-10 max-w-5xl w-full flex flex-col items-center text-center space-y-8">
                <h1 className="text-6xl font-extrabold tracking-tight">
                    {t("home.title_part1")} <span className="text-primary">{t("home.title_part2")}</span>
                </h1>
                <p className="text-xl text-zinc-400 max-w-2xl">
                    {t("home.subtitle")}
                </p>

                <div className="flex gap-4">
                    <Button asChild size="lg" className="text-lg px-8">
                        <Link href="/register">{t("home.start_now")}</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="text-lg px-8">
                        <Link href="/login">{t("home.login")}</Link>
                    </Button>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 bg-zinc-800 rounded-xl">
                        <h3 className="text-2xl font-bold mb-2">{t("home.features.learning_title")}</h3>
                        <p className="text-zinc-400">{t("home.features.learning_desc")}</p>
                    </div>
                    <div className="p-6 bg-zinc-800 rounded-xl">
                        <h3 className="text-2xl font-bold mb-2">{t("home.features.progress_title")}</h3>
                        <p className="text-zinc-400">{t("home.features.progress_desc")}</p>
                    </div>
                    <div className="p-6 bg-zinc-800 rounded-xl">
                        <h3 className="text-2xl font-bold mb-2">{t("home.features.store_title")}</h3>
                        <p className="text-zinc-400">{t("home.features.store_desc")}</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
