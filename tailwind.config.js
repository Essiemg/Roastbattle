/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        reddit: {
          orange: '#FF4500',
          blue: '#0079D3',
          dark: '#1A1A1B',
          light: '#DAE0E6',
          gray: '#878A8C'
        },
        roast: {
          primary: '#FF4500',
          secondary: '#FF6B35',
          success: '#46D39A',
          warning: '#F59E0B',
          error: '#EF4444',
          dark: '#0F0F23',
          'dark-light': '#1A1A2E'
        }
      },
      fontFamily: {
        'reddit': ['Inter', 'system-ui', 'sans-serif']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'roast-flash': 'roastFlash 0.6s ease-in-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        roastFlash: {
          '0%, 100%': { backgroundColor: 'rgb(255 69 0 / 0.1)' },
          '50%': { backgroundColor: 'rgb(255 69 0 / 0.3)' }
        }
      }
    },
  },
  plugins: [],
};