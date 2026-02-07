"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function AdminPage() {
    const { t } = useLanguage();

    return (
        <div className="space-y-6">
            <h1 className="text-4xl font-bold text-white tracking-tight">Admin Dashboard</h1>
            <p className="text-zinc-400">Welcome to the DrumCoach administration panel.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-[#0F172A] border border-white/10 rounded-2xl shadow-xl">
                    <h3 className="text-lg font-semibold mb-2">System Status</h3>
                    <div className="flex items-center gap-2 text-[#22D3EE]">
                        <div className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse"></div>
                        <span className="text-sm">Active & Stable</span>
                    </div>
                </div>

                <div className="p-6 bg-[#0F172A] border border-white/10 rounded-2xl shadow-xl">
                    <h3 className="text-lg font-semibold mb-2">New Registrations</h3>
                    <div className="text-3xl font-bold text-white">124</div>
                    <p className="text-xs text-zinc-500 mt-1">+12% from last week</p>
                </div>

                <div className="p-6 bg-[#0F172A] border border-white/10 rounded-2xl shadow-xl">
                    <h3 className="text-lg font-semibold mb-2">Revenue (30d)</h3>
                    <div className="text-3xl font-bold text-[#22D3EE]">$3,420</div>
                    <p className="text-xs text-zinc-500 mt-1">Target: $4,000</p>
                </div>
            </div>
        </div>
    );
}
