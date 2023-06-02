/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "plus-jakarta-sans": "'Plus Jakarta Sans', sans-serif",
      },
    },
  },
  plugins: [],
};
