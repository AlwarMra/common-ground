/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '1/3-center': '1fr 4fr 1fr',
        'custom-fit': 'repeat(auto-fit, minmax(180px, 1fr))',
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('mobileMenu', '&[aria-expanded-mobile="true"]')
    }),
  ],
}
