module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // can be removed once twin.macro fully supports Tailwind v3
      outline: {
        'theme-red': '2px solid #E24E4D',
      },
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
        black: {
          light: '#575757',
          lighter: '#333333',
          DEFAULT: '#000000',
        },
        grey: {
          DEFAULT: '#8B8B8B',
          D8: '#D8D8D8',
          '8B': '#8B8B8B',
        },
      },
      // [FONT FAMILY]
      fontFamily: {
        primary: "'Open Sans', sans-serif",
        'open-sans': ['Open Sans', 'sans-serif'],
      },
      borderRadius: {
        10: '10px',
      },
      borderWidth: {
        1.5: '1.5px',
      },
    },
  },
  plugins: [],
};
