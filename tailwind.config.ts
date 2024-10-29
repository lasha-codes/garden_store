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
        main: '#588535',
      },
      fontFamily: {
        poppins: 'Poppins',
        notoSans: 'Noto Sans Georgian',
      },
    },
  },
  plugins: [],
}
export default config
