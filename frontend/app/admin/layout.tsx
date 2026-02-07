"use client";

import Header from "@/components/admin/Header";
import RightSidebar from "@/components/admin/RightSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#0B0F14] text-[#E5E7EB] selection:bg-[#22D3EE]/30">
            {/* Top Fixed Header */}
            <Header />

            <div className="flex">
                {/* Main Content Area (Left shifted to accommodate Sidebar on right) */}
                <main className="flex-1 transition-all duration-300 lg:pr-[280px] group-has-[aside[aria-expanded='false']]:lg:pr-20">
                    <div className="p-8">
                        {children}
                    </div>
                </main>

                {/* Sidebar on the Right */}
                <RightSidebar />
            </div>

            {/* Injected CSS for Layout Dynamics */}
            <style jsx global>{`
                /* Target main when sidebar is collapsed */
                main {
                    padding-right: var(--sidebar-width, 280px);
                }
                @media (max-width: 1023px) {
                    main {
                        padding-right: 0 !important;
                    }
                }
            `}</style>
        </div>
    );
}
