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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#4A90E2", // Custom primary color
        secondary: "#D0021B", // Custom secondary color
        accent: "#F5A623", // Custom accent color
      },
      animation: {
        fadeIn: "fadeIn 0.4s ease-in-out",
        slideInLeft: "slideInLeft 0.5s ease-in-out",
        slideInRight: "slideInRight 0.5s ease-in-out",
        bounceIn: "bounceIn 0.6s ease-out",
        pulse: "pulse 1s infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideInLeft: {
          from: { transform: "translateX(-30px)", opacity: 0 },
          to: { transform: "translateX(0)", opacity: 1 },
        },
        slideInRight: {
          from: { transform: "translateX(30px)", opacity: 0 },
          to: { transform: "translateX(0)", opacity: 1 },
        },
        bounceIn: {
          '0%': { transform: "scale(0.5)", opacity: 0 },
          '50%': { transform: "scale(1.2)", opacity: 1 },
          '100%': { transform: "scale(1)", opacity: 1 },
        },
        pulse: {
          '0%': { transform: "scale(1)", opacity: 1 },
          '50%': { transform: "scale(1.05)", opacity: 0.7 },
          '100%': { transform: "scale(1)", opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};

export default config;
