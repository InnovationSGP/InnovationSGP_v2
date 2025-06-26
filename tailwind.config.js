/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/template/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: "#281259",
        primaryPurple: "#6f42c1",
        primaryGold: "#515100",
        primaryPink: "#C04BF2",
        secondaryPurpleLight: "#f4e6fa",
        secondaryBackground: "#dceee0",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100%", // Ensures content isn't constrained too narrowly
            color: "#333",
            a: {
              color: "#3182ce",
              "&:hover": {
                color: "#2c5282",
              },
            },
            h1: {
              fontWeight: "700",
            },
            h2: {
              fontWeight: "600",
            },
            h3: {
              fontWeight: "600",
            },
            blockquote: {
              borderLeftColor: "#6f42c1",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
