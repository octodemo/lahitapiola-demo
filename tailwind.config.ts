import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        moonpig: {
          pink: '#E8175D',
          'pink-dark': '#C4124F',
          'pink-light': '#FF4D8D',
          coral: '#FF6B6B',
          cream: '#FFF5F8',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
export default config
