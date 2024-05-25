module.exports = {
  darkMode: 'class',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Define a 15-column layout
        '15': 'repeat(15, minmax(0, 1fr))',
      },
      gridColumn: {
        // Custom column spans
        'span-11.5': 'span 11.5 / span 11.5',
        'span-3.5': 'span 3.5 / span 3.5',
      },
      maxWidth: {
        '13xl': '96rem', // Custom width, you can set it to any value you like
      },
      fontSize: {
        'xxs': '0.625rem', // Custom size, adjust as needed
      },
      colors: {
        'custom-dark': '#0F0F0F',
        'custom-white': '#F5F3F4',
        'custom-gray': '#262626',
        "custom-hover-gray": "#3F3F3F",
      },
    },
  },
  variants: {},
  plugins: [],
};

