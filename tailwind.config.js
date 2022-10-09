/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: { primary: ["Montserrat", "sans-serif"] },
      colors: { primary: "#18D860" },
    },
  },
  plugins: [],
};
