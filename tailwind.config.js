/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./components/**/*.html",
    "./js/**/*.js",
    "./aegnticdotai-home/**/*.html",
    "./aegnticdotai-blog-main/**/*.html",
    "./aegnticdotai-blog-article/**/*.html",
    "./aegnticdotai-projects-page/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        'primary-glow': '#00E5FF',
        'dark-bg': '#020205',
        'card-bg': 'rgba(5, 10, 20, 0.4)',
        'border-glow': 'rgba(0, 229, 255, 0.15)',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-glass': 'linear-gradient(135deg, #fff 0%, #a5f3fc 40%, #00B0FF 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 229, 255, 0.6)',
        'card': '0 0 20px rgba(0, 0, 0, 0.7), inset 0 0 30px rgba(0, 229, 255, 0.03)',
        'card-hover': '0 0 30px rgba(0, 229, 255, 0.2), inset 0 0 30px rgba(0, 229, 255, 0.05)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
  corePlugins: {
    preflight: false, // Disable Tailwind's reset to keep custom styles
  },
}