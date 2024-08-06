/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        "cor-333333": "#333333",
        "cor-fff3e3": "#FFF3E3",
        "cor-B88E2F": "#B88E2F",
        "cor-666666": "#666666",
        "cor-3A3A3A": "#3A3A3A",
        "cor-898989": "#898989",
        "cor-B0B0B0": "#B0B0B0",
        "cor-616161": "#616161",
        "cor-9F9F9F": "#9F9F9F",
        "cor-D9D9D9": "#D9D9D9",
        "cor-F9F1E7": "#F9F1E7",
        "cor-FFC700": "#FFC700",
      },
    },
  },
  plugins: [],
};
