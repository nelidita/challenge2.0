/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        burst: "url('/src/assets/burst.svg')",
        footer: "url('/src/assets/footer.jpg')",
      },
    },
  },
  plugins: [],
};
