"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function ProductosPage() {
    const { t } = useLanguage();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">{t("admin.titles.productos")}</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="p-4 bg-[#0F172A] border border-white/10 rounded-xl text-center shadow-lg">
                        <div className="w-full aspect-square bg-zinc-800 rounded-lg mb-3"></div>
                        <p className="text-sm font-medium line-clamp-1">Viceroy sticks 5A</p>
                        <p className="text-xs text-[#22D3EE] font-bold">500 PTS</p>
                        <div className="mt-3 pt-3 border-t border-white/5 flex justify-center items-center gap-2">
                            <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Stock:</span>
                            <span className="text-xs font-semibold">12</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
