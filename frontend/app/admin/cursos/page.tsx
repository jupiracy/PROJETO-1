"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function CursosPage() {
    const { t } = useLanguage();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">{t("admin.titles.cursos")}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                    <div key={i} className="p-6 bg-[#0F172A] border border-white/10 rounded-xl hover:border-[#22D3EE]/30 transition-all group">
                        <div className="h-32 bg-zinc-800/50 rounded-lg mb-4 mb-4 flex items-center justify-center text-zinc-600">
                            Course Thumbnail {i}
                        </div>
                        <h3 className="text-xl font-bold mb-2">Drums Masterclass Vol {i}</h3>
                        <p className="text-zinc-400 text-sm mb-4">A complete guide to advanced rudiments and linear fills.</p>
                        <div className="flex justify-between items-center text-xs text-zinc-500">
                            <span>15 Lessons</span>
                            <span className="text-[#22D3EE]">84 Students Enrolled</span>
                        </div>
                    </div>
                ))}
                <button className="p-6 border border-dashed border-white/10 rounded-xl hover:bg-white/5 transition-all flex flex-col items-center justify-center gap-2 group">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#22D3EE]/20 group-hover:text-[#22D3EE] transition-all">
                        +
                    </div>
                    <span className="text-sm font-medium">Create New Course</span>
                </button>
            </div>
        </div>
    );
}
