"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface SidebarNavItemProps {
    href: string;
    icon: LucideIcon;
    labelKey: string;
    isCollapsed: boolean;
}

export default function SidebarNavItem({ href, icon: Icon, labelKey, isCollapsed }: SidebarNavItemProps) {
    const pathname = usePathname();
    const { t } = useLanguage();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group relative
                ${isActive
                    ? "bg-[#22D3EE]/10 text-[#22D3EE]"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                }`}
        >
            <Icon className={`w-6 h-6 shrink-0 ${isActive ? "text-[#22D3EE]" : "group-hover:text-white"}`} />

            {!isCollapsed && (
                <span className="font-medium whitespace-nowrap overflow-hidden text-sm">
                    {t(`admin.menu.${labelKey}`)}
                </span>
            )}

            {isCollapsed && (
                <div className="absolute left-[-10px] transform -translate-x-full ml-[-12px] px-2 py-1 bg-[#111827] text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity border border-white/10 z-[100] whitespace-nowrap">
                    {t(`admin.menu.${labelKey}`)}
                </div>
            )}
        </Link>
    );
}
