module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minWidth: {
      '10vw': '10vw',
      'full': '100%',
    },
    maxWidth: {
      '850px': '850px',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
