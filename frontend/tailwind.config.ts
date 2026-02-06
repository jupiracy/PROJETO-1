import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#ff6600",
                secondary: "#10b981",
                dark: "#121212",
                "dark-card": "#1e1e1e",
            },
        },
    },
    plugins: [],
};
export default config;
