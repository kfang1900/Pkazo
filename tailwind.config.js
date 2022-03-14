module.exports = {
  content: ['./**/**/*.{html,js}'],
  theme: {
    extend: {
      // [COLORS]
      colors: {
        'theme-red': '#E24E4D',
        dark: {
          100: '#8E8E93',
          200: '#65676B',
          300: '#333333',
          400: '#222222',
        },
        light: {
          100: '#F4F4F4',
          200: '#F1F2F3',
          300: '#D8D8D8',
          400: '#8B8B8B',
        },
      },
      // [FONT FAMILY]
      fontFamily: {
        primary: "'Open Sans', sans-serif",
      },
    },
  },
  plugins: [],
};
