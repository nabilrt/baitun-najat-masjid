/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        moss: {
          50: "#f3f7f2",
          100: "#e2ece2",
          200: "#c7d8c9",
          300: "#9ebaa4",
          400: "#6b967a",
          500: "#3f6f55",
          600: "#2f5b46",
          700: "#234437",
          800: "#183128",
          900: "#11261f"
        },
        gold: {
          300: "#f7c978",
          400: "#f2a445",
          500: "#e78f2e",
          600: "#d4791d"
        }
      },
      boxShadow: {
        soft: "0 18px 40px rgba(19, 57, 38, 0.12)"
      },
      backgroundImage: {
        hero: "linear-gradient(135deg, rgba(19, 73, 54, 0.96), rgba(38, 122, 87, 0.92))"
      }
    }
  },
  plugins: []
};
