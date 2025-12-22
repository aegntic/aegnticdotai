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
                primary: "#00f0ff", // Neon Cyan
                "primary-dark": "#00a0aa",
                "background-dark": "#030305", // Deepest black/blue
                "surface-dark": "#0a0a0c",
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                serif: ["Playfair Display", "serif"],
                mono: ["JetBrains Mono", "monospace"],
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'border-top': 'scan-right 2s linear infinite',
                'border-right': 'scan-down 2s linear infinite',
                'border-bottom': 'scan-left 2s linear infinite',
                'border-left': 'scan-up 2s linear infinite',
                'grid-move': 'gridMove 20s linear infinite',
                'drift': 'drift 20s ease-in-out infinite alternate',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                shimmer: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
                'scan-right': {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' }
                },
                'scan-down': {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100%)' }
                },
                'scan-left': {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(-100%)' }
                },
                'scan-up': {
                    '0%': { transform: 'translateY(100%)' },
                    '100%': { transform: 'translateY(-100%)' }
                },
                gridMove: {
                    '0%': { backgroundPosition: '0 0' },
                    '100%': { backgroundPosition: '50px 50px' },
                },
                drift: {
                    '0%': { transform: 'translate(0, 0)' },
                    '100%': { transform: 'translate(30px, -30px)' },
                }
            }
        },
    },
    plugins: [],
}
