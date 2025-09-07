module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: { 50: '#f5f3ff', 100: '#ede9fe', 500: '#7c3aed', 600:'#6d28d9' },
        bgDark: '#0b1020', cardDark: '#13161b', muted: '#9CA3AF'
      },
      boxShadow: { soft: '0 10px 30px rgba(2,6,23,0.08)' }
    }
  },
  plugins: []
}
