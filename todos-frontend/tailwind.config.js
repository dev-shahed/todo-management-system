/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "rgb(196 181 253)",
        second: "#47019d",
        three: "#e00256",
        black: "#212121",
        white: "#ffffff",
        gray: "#808080e2",
        greytext: "text-gray-900",
      },
    },
  },
  plugins: [],
};
