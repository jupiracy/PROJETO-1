"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function EstadisticasPage() {
    const { t } = useLanguage();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">{t("admin.titles.estadisticas")}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-[#0F172A] border border-white/10 rounded-xl bg-gradient-to-br from-[#0F172A] to-[#111827]">
                    <h4 className="text-sm font-semibold text-zinc-400 mb-4">Activity Overview</h4>
                    <div className="h-48 flex items-end gap-2 px-2">
                        {[40, 60, 30, 90, 100, 70, 85].map((h, i) => (
                            <div key={i} className="flex-1 bg-white/5 rounded-t-sm group relative">
                                <div
                                    className="absolute bottom-0 w-full bg-[#22D3EE]/50 group-hover:bg-[#22D3EE] transition-all rounded-t-sm"
                                    style={{ height: `${h}%` }}
                                ></div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-6 bg-[#0F172A] border border-white/10 rounded-xl">
                    <h4 className="text-sm font-semibold text-zinc-400 mb-4">Course Popularity</h4>
                    <div className="space-y-4">
                        {[
                            { name: "Basics", val: 80 },
                            { name: "Double Stroke", val: 65 },
                            { name: "Linear Fills", val: 30 }
                        ].map((item, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span>{item.name}</span>
                                    <span className="text-zinc-500">{item.val}%</span>
                                </div>
                                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#22D3EE]" style={{ width: `${item.val}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
