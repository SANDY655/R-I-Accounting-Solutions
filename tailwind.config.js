/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#ecfafb',
          100: '#d0f2f5',
          200: '#a7e4e9',
          300: '#6bccd6',
          400: '#34aebc',
          500: '#1b92a1',
          600: '#056a6f',
          700: '#06575c',
          800: '#0a464b',
          900: '#0d3b40',
          950: '#06262a',
        },
        secondary: {
          50: '#eff5fa',
          100: '#dce8f4',
          200: '#bdd5eb',
          300: '#8eb9de',
          400: '#5a99cf',
          500: '#387ebd',
          600: '#27629b',
          700: '#1f4e7c',
          800: '#1b4369',
          900: '#0f2c41',
          950: '#0a1d2d',
        },
        accent: {
          50: '#fbf9f1',
          100: '#f6eecb',
          200: '#eedf91',
          300: '#e5ca52',
          400: '#ddba27',
          500: '#d69f3b',
          600: '#b87c2b',
          700: '#955b25',
          800: '#7b4823',
          900: '#643b20',
          950: '#3a1f0f',
        }
      }
    },
  },
  plugins: [],
};
