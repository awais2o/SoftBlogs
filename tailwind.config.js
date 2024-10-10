/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',

  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        space: ['Space Grotesk', 'sans-serif']
      },
      colors: {
        primary: '#F5F5DC',
        card: '#D9BBA9',
        cardv2: '#E8D3C6',
        button: '#8B4513',
        disabledbutton: '#CD853F',
        hoverbutton: '#7A3910',
        input: '#FFF8E7',
        inputtext: '#5D3A1A'
      }
    }
  },
  plugins: []
}
