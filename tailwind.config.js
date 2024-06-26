module.exports = {
  darkMode: 'class',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      gridTemplateColumns: {
        '15': 'repeat(15, minmax(0, 1fr))',
        'auto-fit-minmax-300': 'repeat(auto-fit, minmax(300px, 1fr))',
      },
      
      maxWidth: {
        '8xl': '88rem',   // 1408px
        '9xl': '96rem',   // 1536px
        '10xl': '104rem', // 1664px
        '10.5xl': '108rem', // 1664px
        '11xl': '112rem', // 1792px
        '12xl': '120rem', // 1920px
        '13xl': '128rem', // 2048px
        '14xl': '136rem', // 2176px
        '15xl': '144rem', // 2304px
      
      },
      fontSize: {
        'xxs': '0.625rem', 
        'custom-xl': '1.0rem',
      },
      lineHeight: {
        'custom-xl': '2.2rem',
      },
      colors: {
        'custom-dark': '#0F0F0F',
        'custom-white': '#F5F3F4',
        'custom-gray': '#262626',
        'custom-gray-sub': '#292a2a',
        "custom-hover-gray": "#3F3F3F",
        "custom-gray-desc": "#272727",
        "custom-gray-thumbnail": "#ACACAC",
        "custom-white-thumbnail": "#F1F1F1",
      },
      width: {
        '128': '32rem', 
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },
      fontWeight: {
        'medium': 600,
      },
    },
  },
  variants: {},
  plugins: [],
};

