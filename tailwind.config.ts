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
        lt: {
          navy: '#003876',
          'navy-dark': '#002558',
          teal: '#00A878',
          'teal-dark': '#008A62',
          orange: '#E8620A',
          'orange-dark': '#C45008',
          cream: '#F0F4F8',
        },
        // Keep moonpig colours so old /cards route still renders
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
