/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "deep-space": "#0a0a12",
                "surface": "#14141f",
                "surface-raised": "#1c1c2a",
                "surface-inset": "#0e0e18",
                "text-primary": "#f0eef2",
                "text-muted": "#8a8a9a",
                "text-dim": "#55556a",
                "accent-blue": "#00CFE5",
                "accent-orange": "#CD7F32",
                "accent-blue-muted": "#009AB0",
                "accent-orange-muted": "#A06628",
                "silver": "#C0C0C0",
                "silver-dark": "#808080",
            },
            fontFamily: {
                display: ['"Clash Display"', "sans-serif"],
                body: ['"Satoshi"', "sans-serif"],
                mono: ['"JetBrains Mono"', "monospace"],
            },
            boxShadow: {
                "neu": "10px 10px 24px rgba(0,0,0,0.6), -6px -6px 16px rgba(50,50,70,0.25)",
                "neu-sm": "6px 6px 12px rgba(0,0,0,0.6), -4px -4px 10px rgba(50,50,70,0.25)",
                "neu-inset": "inset 4px 4px 8px rgba(0,0,0,0.6), inset -4px -4px 8px rgba(50,50,70,0.25)",
                "neu-hover": "16px 16px 40px rgba(0,0,0,0.6), -10px -10px 24px rgba(50,50,70,0.25), 0 0 20px rgba(0,207,229,0.06)",
                "deep": "12px 12px 32px rgba(0,0,0,0.6), -8px -8px 20px rgba(50,50,70,0.25)",
            },
            borderRadius: {
                "neu": "20px",
                "neu-sm": "16px",
            },
            animation: {
                "breathe": "breathe 2.5s ease-in-out infinite",
                "float": "float 6s ease-in-out infinite",
                "slide-up": "slideUp 0.6s ease forwards",
                "fade-in": "fadeIn 0.5s ease forwards",
                "shimmer": "shimmer 3s ease-in-out infinite",
            },
            keyframes: {
                breathe: {
                    "0%, 100%": { opacity: "0.4", transform: "translateY(0)" },
                    "50%": { opacity: "0.7", transform: "translateY(8px)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-8px)" },
                },
                slideUp: {
                    from: { opacity: "0", transform: "translateY(24px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                fadeIn: {
                    from: { opacity: "0" },
                    to: { opacity: "1" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
            },
        },
    },
    plugins: [],
}
