/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mono: ['"DM Mono"', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        plug: {
          bg: '#edecea',
          panel: '#ffffff',
          surface: '#efefef',
          label: '#9b9b9b',
          text: '#3f3f3f',
          border: 'rgba(79,71,61,0.12)',
          muted: 'rgba(63,63,63,0.12)',
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-none': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        },
      })
    },
  ],
}
