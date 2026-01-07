/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        // royalBlue: 'rgb(0, 64, 193)', // Removed as we switched to emerald
      }
    },
  },
  plugins: [],
};
