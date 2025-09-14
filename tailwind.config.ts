import type { Config } from "tailwindcss";
import colors, { generateTailwindColors } from './src/theme/colors';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle, #412829 0%, #221C1D 50%, #191616 100%)',
      },
      colors: generateTailwindColors(colors),
    },
  },
  plugins: [],
};

export default config;
