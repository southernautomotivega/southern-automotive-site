/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy900: "#101A30",
        navy800: "#17253F",
        navy700: "#1F304F",
        navy600: "#2A3D66",
        brandOrange: "#F0791A",
        brandGold: "#FDB813",
        bg: "#FAF8F4",
        muted: "#79735F",
        borderTan: "#E9E2D2",
      },
      fontFamily: {
        display: ["Oswald", "sans-serif"],
        body: ["'Source Sans 3'", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,26,48,0.05), 0 10px 24px -8px rgba(16,26,48,0.12)",
      },
    },
  },
  plugins: [],
};
