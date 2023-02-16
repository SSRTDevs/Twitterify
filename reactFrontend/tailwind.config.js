/** @type {import('tailwindcss').Config} */
module.exports = {
<<<<<<< HEAD
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
        }
    },
    plugins: [require("@tailwindcss/line-clamp"), require("daisyui")],
=======
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
>>>>>>> 8551472537834ffd3fa2d2539ac1a6a58b9d9ece
};
