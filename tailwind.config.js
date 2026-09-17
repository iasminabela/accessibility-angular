/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef4ff",
          100: "#d9e6ff",
          500: "#3b6ef5",
          600: "#2f59d6",
          700: "#2445a8",
        },
      },
    },
  },
  plugins: [],
};
