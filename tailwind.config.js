/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'soft-pearl': '#F8F9FA',
        'sunset-coral': '#FF6B6B',
        'soothing-teal': '#4ECDC4',
        'deep-navy': '#292F36',
        'sunny-yellow': '#FFE66D',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], 
      }
    },
  },
  plugins: [],
}