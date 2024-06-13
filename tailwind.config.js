/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        glare: "rgba(0, 0, 0, 0.3)",
        bgLight: "hsl(0, 0%, 98%)",
        textLight: "hsl(200, 15%, 8%)",
        elementLight: "hsl(0, 0%, 100%)",
        inputLight: "hsl(0, 0%, 52%)",
        bgDark: "hsl(207, 26%, 17%)",
        textDark: "hsl(0, 0%, 100%)",
        elementDark: "hsl(209, 23%, 22%)",
        inputDark: "hsl(0, 0%, 100%)",
      },
    },
  },
  plugins: [],
};


