module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        seaGreen: "#347571", // Added custom color as seaGreen
      },
      height: { 
        'true-screen': 'var(--true-vh)', 
        'screen': 'var(--true-vh)', 
      },
    },
  },
  plugins: [],
}
