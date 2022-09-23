module.exports = {
  purge: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#32CD32',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
