/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
        ],
      },
      colors: {
        twitter: {
          100: "#159ff2",
          200: "#1da1f2",
        },
        error: "#f87272",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp"), require("daisyui")],
};
