import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563FF',
          50: '#EEF3FF',
          100: '#D9E4FF',
          200: '#BACCFF',
          300: '#8CADFF',
          400: '#5580FF',
          500: '#2563FF',
          600: '#1A4FE0',
          700: '#1440C2',
          800: '#1234A0',
          900: '#0F2880',
        },
        secondary: '#0F172A',
        surface: '#F8FAFC',
        border: '#E5E7EB',
        text: '#111827',
        muted: '#64748B',
        success: '#16A34A',
        warning: '#F59E0B',
        danger: '#DC2626',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 8px 0 rgba(0,0,0,0.06)',
        'medium': '0 4px 24px 0 rgba(0,0,0,0.08)',
        'large': '0 8px 48px 0 rgba(0,0,0,0.12)',
        'primary': '0 4px 24px 0 rgba(37,99,255,0.25)',
        'glow': '0 0 40px 0 rgba(37,99,255,0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #eef3ff 100%)',
        'blue-gradient': 'linear-gradient(135deg, #2563FF 0%, #1440C2 100%)',
        'dark-gradient': 'linear-gradient(135deg, #0F172A 0%, #1e293b 100%)',
      },
      screens: {
        'xs': '375px',
        '3xl': '1920px',
        '4xl': '2560px',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
    },
  },
  plugins: [],
};

export default config;
