/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './layouts/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      cursor: {
        fancy: 'url(hand.cur), pointer',
      },
    },
  },
  plugins: [],
}
