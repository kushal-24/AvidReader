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
        buttons: "rgb(193,177,162)",
        buttonsT: "#48372d",
        defaults: "#c1b1a2",
        gradients: "#837c70"
      },
      backgroundImage: {
        'warm-gradient': 'linear-gradient(135deg, #3e3227 0%, #7a5e2e 25%, #9b6d45 60%, #4a2d16 100%)',
      },
    },
  },
  plugins: [],
}

