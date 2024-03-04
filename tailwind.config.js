/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      baloo: ["Baloo", "sans-serif"],
      sf: ["SF Pro Rounded", "sans-serif"],
    },

    colors: {
      blue: "rgba(0, 92, 183, 1)",
      pink: "rgba(204, 37, 137, 1)",
      white: "rgba(255, 255, 255, 1)",
      black: "#2E2E2E",
    },
  },

  plugins: [],
};
