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
        }
    },
    plugins: [require("@tailwindcss/line-clamp"), require("daisyui")],
};
