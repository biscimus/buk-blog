import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./mdx-components.tsx"
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            keyframes: {
                // Create a new animation that changes the width from 0 to 100%
                "slideIn": {
                    from: { width: "0%" },
                    to: { width: "100%" },
                },
                "slideOut": {
                    from: { width: "100%" },
                    to: { width: "0%" },
                },
                "bounce": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-25%)" }
                }
            },
            animation: {
                "slideIn": "slideIn 1s ease-in forwards",
                "slideOut": "slideOut 1s ease-out forwards",
                "bounceSlow": "bounce 3s 2s infinite",
            },
        },
    },
    plugins: [],
};
export default config;
