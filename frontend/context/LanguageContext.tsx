"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import en from "../translations/en.json";
import pt from "../translations/pt.json";
import es from "../translations/es.json";

type Language = "EN" | "PT" | "ES";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (path: string) => string;
}

const translations: Record<Language, any> = {
    EN: en,
    PT: pt,
    ES: es,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>("EN");

    // Persist language preference
    useEffect(() => {
        const savedLang = localStorage.getItem("preferredLanguage") as Language;
        if (savedLang && ["EN", "PT", "ES"].includes(savedLang)) {
            setLanguage(savedLang);
        }
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem("preferredLanguage", lang);
    };

    const t = (path: string): string => {
        const keys = path.split(".");
        let current = translations[language];

        for (const key of keys) {
            if (current[key] === undefined) {
                console.warn(`Translation key not found: ${path}`);
                return path;
            }
            current = current[key];
        }

        return current;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
