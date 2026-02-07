"use client";

import { useState, useEffect } from "react";
import {
    Users,
    BookOpen,
    ShoppingBag,
    MessageSquare,
    BarChart3,
    ChevronRight,
    ChevronLeft,
    Menu,
    X
} from "lucide-react";
import SidebarNavItem from "./SidebarNavItem";
import { useLanguage } from "@/context/LanguageContext";

export default function RightSidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const { t } = useLanguage();

    // Persist collapse state
    useEffect(() => {
        const saved = localStorage.getItem("adminSidebarCollapsed");
        if (saved !== null) setIsCollapsed(saved === "true");
    }, []);

    const toggleCollapse = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        localStorage.setItem("adminSidebarCollapsed", String(newState));
    };

    const menuItems = [
        { href: "/admin/estudiantes", icon: Users, labelKey: "estudiantes" },
        { href: "/admin/cursos", icon: BookOpen, labelKey: "cursos" },
        { href: "/admin/productos", icon: ShoppingBag, labelKey: "productos" },
        { href: "/admin/mensajes", icon: MessageSquare, labelKey: "mensajes" },
        { href: "/admin/estadisticas", icon: BarChart3, labelKey: "estadisticas" },
    ];

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-[#22D3EE] text-black rounded-full shadow-lg"
                aria-label="Open menu"
            >
                <Menu className="w-6 h-6" />
            </button>

            {/* Backdrop for Mobile */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-[60] lg:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={`fixed right-0 top-0 h-full bg-[#0B0F14] border-l border-white/10 transition-all duration-300 z-[70] flex flex-col
                    ${isMobileOpen ? "translate-x-0 w-[280px]" : "translate-x-full lg:translate-x-0"}
                    ${isCollapsed ? "lg:w-20" : "lg:w-[280px]"}
                `}
                aria-expanded={!isCollapsed}
            >
                {/* Close Button for Mobile */}
                <button
                    onClick={() => setIsMobileOpen(false)}
                    className="lg:hidden absolute top-4 left-[-50px] p-2 bg-[#0B0F14] border border-white/10 text-white rounded-full"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Desktop Toggle Toggle Button */}
                <div className="h-16 flex items-center justify-center border-b border-white/10 shrink-0">
                    <button
                        onClick={toggleCollapse}
                        className="hidden lg:flex p-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
                        title={t("admin.menu.toggle_sidebar")}
                    >
                        {isCollapsed ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
                    </button>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2 custom-scrollbar">
                    {menuItems.map((item) => (
                        <SidebarNavItem
                            key={item.href}
                            {...item}
                            isCollapsed={isCollapsed}
                        />
                    ))}
                </nav>
            </aside>
        </>
    );
}
