"use client";

import Image from "next/image";
import { Bell, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

export default function Header() {
    const { t } = useLanguage();

    return (
        <header className="sticky top-0 z-40 w-full bg-[#0B0F14] border-b border-white/10 shadow-sm h-16 flex items-center px-6">
            <div className="flex items-center justify-between w-full">
                {/* Left Side: Profile & Notifications */}
                <div className="flex items-center gap-4">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10">
                        <Image
                            src="/avatars/admin-placeholder.png"
                            alt="User Profile"
                            fill
                            className="object-cover"
                            onError={(e) => {
                                // Fallback if image doesn't exist
                                e.currentTarget.src = "https://ui-avatars.com/api/?name=Admin&background=22D3EE&color=fff";
                            }}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            className="p-2 rounded-full hover:bg-white/5 transition-colors relative"
                            aria-label={t("admin.header.notifications")}
                        >
                            <Bell className="w-5 h-5 text-zinc-400" />
                            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                3
                            </span>
                        </button>
                    </div>
                </div>

                {/* Right Side: Logo & Language */}
                <div className="flex items-center gap-6">
                    <LanguageSelector />
                    <div className="flex items-center gap-2 select-none">
                        <span className="text-xl font-black tracking-tighter text-white">
                            DRUM<span className="text-[#22D3EE]">COACH</span>
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
}
