module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minWidth: {
      '10vw': '10vw',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
