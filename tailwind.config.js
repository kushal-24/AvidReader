/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:
    {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        navBlue: "#8DA9C4",
        bodyBlue: "#0B2545",
        lightBlue: "#EEF4ED",
        bodyBlue2: "#13315C",
        hoverBlue: "#134074"

      },
    },
  },
  plugins: [],
}

