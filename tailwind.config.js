/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Pretendard",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "Apple SD Gothic Neo",
          "Malgun Gothic",
          "sans-serif",
        ],
      },
      boxShadow: {
        glow: "0 18px 60px rgba(110, 80, 255, 0.22)",
        card: "0 18px 38px rgba(52, 74, 126, 0.12)",
      },
      colors: {
        lecture: {
          ink: "#101631",
          muted: "#64708a",
          purple: "#7c3aed",
          blue: "#1995ff",
          cyan: "#27d7ff",
          emerald: "#20c997",
          amber: "#f8b84e",
          rose: "#ff5d8f",
          paper: "#f7fbff",
        },
      },
    },
  },
  plugins: [],
};
