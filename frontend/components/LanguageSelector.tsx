"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSelector() {
    const [isOpen, setIsOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();

    const languages = [
        { code: "EN" as const, label: "English", flag: "🇺🇸" },
        { code: "PT" as const, label: "Português", flag: "🇧🇷" },
        { code: "ES" as const, label: "Español", flag: "🇪🇸" },
    ];

    const handleSelect = (langCode: "EN" | "PT" | "ES") => {
        setLanguage(langCode);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-full hover:bg-accent hover:text-accent-foreground"
                title="Change Language"
            >
                <Globe className="h-5 w-5" />
            </Button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md bg-popover text-popover-foreground shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="py-1">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleSelect(lang.code)}
                                className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-accent hover:text-accent-foreground transition-colors ${language === lang.code ? "bg-accent/50 font-medium" : ""
                                    }`}
                            >
                                <span className="text-base">{lang.flag}</span>
                                {lang.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Backdrop to close on click outside */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-transparent"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
}
