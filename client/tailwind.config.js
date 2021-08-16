module.exports = {
  purge: {
    enabled: false,
    content: [
      './src/**/*.html',
      './src/**/*.js'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    inset: {
      '5': '5px',
      '8': '8px',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
