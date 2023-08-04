/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  theme: {
    fontFamily: {
      zurich: ["Zurich"],
    },
    extend: {
      keyframes: {
        moveup: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        opacity0: {
          '0%': { opacity: '0' },
          '100%': { opacity: '0' },
        },

      },
      backgroundImage: {
        'gradient-276': 'linear-gradient(276deg, var(--tw-gradient-stops))'
        // https://stackoverflow.com/a/75626641/12155544
      }
    }
  },
  plugins: [],
}
