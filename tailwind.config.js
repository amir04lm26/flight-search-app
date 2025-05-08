/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'media',
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: "#FFCD56",
                    DEFAULT: "#FFB300",
                    dark: "#E08C00",
                },
                gray: {
                    100: "#F7F9FC",
                    200: "#ECEFF4",
                    300: "#D9DEE8",
                    400: "#B0B8C4",
                    500: "#6B7280", // Text
                    700: "#374151", // Headings
                    900: "#1F2937",
                },
                success: "#2ECC71",
                danger: "#E74C3C",
                warning: "#F39C12",
            },
            fontFamily: {
                sans: ["'Geist'", "ui-sans-serif", "system-ui"],
                mono: ["'Geist Mono'", "monospace"],
            },
            borderRadius: {
                DEFAULT: "0.5rem",
                xl: "1rem",
            },
            boxShadow: {
                card: "0 4px 14px rgba(0, 0, 0, 0.06)",
                focus: "0 0 0 3px rgba(26, 115, 232, 0.4)",
            },
            keyframes: {
                'fade-in': {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
            },
            animation: {
                'fade-in': 'fade-in 0.2s ease-out',
            },
        },
    },
    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/aspect-ratio"),
        require("@tailwindcss/typography"),
    ],
};
