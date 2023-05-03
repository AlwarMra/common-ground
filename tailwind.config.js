/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
        fancy: ['Alfa Slab One'],
      },
      gridTemplateColumns: {
        '1/3-center': '1fr 4fr 1fr',
        'custom-fit': 'repeat(auto-fit, minmax(180px, 1fr))',
        'min-content': 'min-content 1fr',
      },
      height: {
        vw: '100vw',
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('mobileMenu', '&[aria-expanded-mobile="true"]')
    }),
  ],
}
