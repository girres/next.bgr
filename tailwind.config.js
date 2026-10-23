/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#EBEBEB',
        ink: '#000000',
        'ink-muted': 'rgba(0, 0, 0, 0.6)',
        'on-primary': '#FFFFFF',
      },
      fontFamily: {
        sans: [
          '"Instrument Sans Variable"',
          'Instrument Sans',
          '-apple-system',
          'BlinkMacSystemFont',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      fontSize: {
        'bs-16': ['1rem', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        'bs-17': ['1.0625rem', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        'bs-18': ['1.125rem', { lineHeight: '1.5rem', letterSpacing: '-0.02em' }],
        'bs-20': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.02em' }],
        'bs-22': ['1.375rem', { lineHeight: '1.875rem', letterSpacing: '-0.02em' }],
        'bs-25': ['1.5625rem', { lineHeight: '2.1875rem', letterSpacing: '-0.02em' }],
        'bs-48': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.07em' }],
        'bs-72': ['4.5rem', { lineHeight: '1.2', letterSpacing: '-0.07em' }],
      },
    },
  },
};
