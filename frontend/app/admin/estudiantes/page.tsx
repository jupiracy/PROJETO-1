"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function EstudiantesPage() {
    const { t } = useLanguage();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">{t("admin.titles.estudiantes")}</h1>
            <div className="w-full bg-[#0F172A] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[#111827] text-zinc-400 text-sm">
                        <tr>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">Student</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">Level</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {[1, 2, 3].map((i) => (
                            <tr key={i} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4">Student {i}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-white/5 rounded text-zinc-300 text-xs text-xs">Intermediate</span>
                                </td>
                                <td className="px-6 py-4 text-[#22D3EE] text-sm">Active</td>
                                <td className="px-6 py-4">
                                    <button className="text-xs text-zinc-500 hover:text-white underline">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="p-4 bg-[#111827]/50 text-center text-xs text-zinc-500">
                    Showing 3 of 124 students
                </div>
            </div>
        </div>
    );
}
