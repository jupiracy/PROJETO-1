"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function MensajesPage() {
    const { t } = useLanguage();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">{t("admin.titles.mensajes")}</h1>
            <div className="bg-[#0F172A] border border-white/10 rounded-xl overflow-hidden">
                <div className="divide-y divide-white/5">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="p-4 hover:bg-white/5 cursor-pointer transition-colors flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-zinc-700 shrink-0"></div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="text-sm font-semibold truncate">User Name {i}</h4>
                                    <span className="text-[10px] text-zinc-500">2h ago</span>
                                </div>
                                <p className="text-xs text-zinc-400 line-clamp-1">I have a question about the advanced double stroke lesson...</p>
                            </div>
                            {i === 1 && <div className="w-2 h-2 rounded-full bg-[#22D3EE]"></div>}
                        </div>
                    ))}
                </div>
                <div className="p-4 bg-black/20 text-center">
                    <button className="text-xs text-[#22D3EE] font-semibold hover:underline">View All Messages</button>
                </div>
            </div>
        </div>
    );
}
