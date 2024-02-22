import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'hero-img': "url('/hero-img.jpg')",
      },
    },
    colors: {
      'prisma-blue': '#011935',
      'prisma-gray': '#F4F5F7',
      'prisma-orange': '#F26223',
      'prisma-orange-hover': '#DE5214'
    },
  },
  plugins: [],
};
export default config;
