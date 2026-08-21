/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy950: "#0A1122",
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
        cardHover: "0 2px 4px rgba(16,26,48,0.08), 0 24px 48px -12px rgba(16,26,48,0.22)",
        glow: "0 0 0 1px rgba(240,121,26,0.15), 0 8px 32px -4px rgba(240,121,26,0.35)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(0, -18px)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(0, 22px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-150%)" },
          "100%": { transform: "translateX(150%)" },
        },
        gradientPan: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        floatSlow: "floatSlow 9s ease-in-out infinite",
        shimmer: "shimmer 2.6s ease-in-out infinite",
        gradientPan: "gradientPan 10s ease-in-out infinite",
      },
      backgroundSize: {
        "200%": "200% 200%",
      },
    },
  },
  plugins: [],
};
