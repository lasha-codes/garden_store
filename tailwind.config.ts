import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1730px',
      },
      colors: {
        main: '#588535',
      },
      fontFamily: {
        poppins: 'Poppins',
        notoSans: 'BPG ExtraSquare Mtavruli',
      },
      animation: {
        bounce: 'bounce 0.8s ease-in-out infinite',
      },
      keyframes: {
        bounce: {
          '100%': {
            transform: 'translateY(-1px)',
          },
        },
      },
    },
  },
  plugins: [],
}

export default config
