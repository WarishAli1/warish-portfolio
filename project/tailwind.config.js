/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        paper: "#FAFAF8",
        ink: "#0E1116",
        muted: "#6B7280",
        gridLight: "rgba(0,0,0,0.04)",
        gridDark: "rgba(255,255,255,0.05)",
        accent: "#111827",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.06)",
        softDark: "0 10px 30px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};
