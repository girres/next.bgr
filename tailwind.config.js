/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

const customColors = {
  'main-dark': '#151B21',
  'main-white': '#D0DBE0',
  'main-gray': '#78828C',
  'main-green': '#33FE00',
  'main-purple': '#463F9A',
  'main-purple-2': '#3E539B',
};

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: Object.assign(colors, customColors),
    },
  },
  daisyui: {
    themes: false,
  },
  plugins: [require('daisyui')],
};
