import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mt: {
          bg: "var(--mt-bg)",
          surface: "var(--mt-surface)",
          border: "var(--mt-border)",
          "border-strong": "var(--mt-border-strong)",
          muted: "var(--mt-muted)",
          body: "var(--mt-body)",
          primary: "var(--mt-primary)",
          "primary-hover": "var(--mt-primary-hover)",
          pink: "var(--mt-pink)",
          "pink-text": "var(--mt-pink-text)",
          "brown-light": "var(--mt-brown-light)",
          "brown-mid": "var(--mt-brown-mid)",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      animation: {
        "spin-wheel": "spin-wheel 4s cubic-bezier(0.17, 0.67, 0.12, 0.99) forwards",
      },
      keyframes: {
        "spin-wheel": {
          "0%": { transform: "rotate(var(--wheel-start, 0deg))" },
          "100%": { transform: "rotate(var(--wheel-final-rotation, 0deg))" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
