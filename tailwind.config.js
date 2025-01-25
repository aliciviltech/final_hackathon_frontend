/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors:{
          'primary':'var(--primaryColor)'
        },
        boxShadow:{
          'shadow-pr':'0 0 10px #757575'
        },
      },
    },
    plugins: [],
  }