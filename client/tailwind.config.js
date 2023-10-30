/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Poppins", "sans"],
      },
      colors: {
        primary: "#366B87",
        secondary: "#5AB4A9",
        dark: "#1b1b1b",
        light: "#A4B6E1",
        grayy: "#F6F9FF",
        // : "rgba(120, 120, 120, 1)",
      },
      fontSize: {
        tiny: "8.89px", // Add your custom "tiny" font size here
        // You can add more custom font sizes as needed
      },
      screens: {
        "2xl": { min: "1635px" },
        // => @media (min-width: 1535px) { ... }

        xl: { min: "1279px" },
        // => @media (min-width: 1279px) { ... }

        lg: { min: "1023px" },
        // => @media (min-width: 1023px) { ... }

        md: { min: "767px" },
        // => @media (min-width: 767px) { ... }

        sm: { max: "639px" },
        // => @media (min-width: 639px) { ... }
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
