/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#050505',
          raised: '#0a0a0a',
          overlay: '#111111',
        },
      },
      keyframes: {
        meteor: {
          '0%': { transform: 'rotate(215deg) translateX(0)', opacity: '0' },
          '5%': { opacity: '1' },
          '60%': { opacity: '1' },
          '100%': { transform: 'rotate(215deg) translateX(-700px)', opacity: '0' },
        },
      },
      animation: {
        'meteor-effect': 'meteor 5s linear infinite',
      },
    },
  },
  plugins: [],
};
