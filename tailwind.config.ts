import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background_blue: "#F5F5F7",
        button_blue: "#0071e3",
        secondary_text: "#6E6E73",
        primary_text: "1D1D1F",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
