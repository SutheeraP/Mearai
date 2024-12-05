import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
const colors = require("tailwindcss/colors");

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
    colors:{
      ...colors,
      'main':'#1CB1A1',
      'accent':'#59BBD1',
      'light':'#F6EFF1',
      'dark':'#191924',
    }
  },
  plugins: [],
} satisfies Config;
