/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'corg': '#ffaf02',
        'cbg': '#efefef',
        'cgrey': '#1e1c2a'
      },
      screens: {
        "xs": "0px",
        "sm": "576px",
        "md": "768px",
        "lg": "992px",
        "xl": "1200px",
        "xxl": "1400px"
      }

    },
  },
  plugins: [],
}

// {
//   'corg': '#ffb412',
//   'cgrey': '#dedde3',
//   'cbg': '#1e1c2a'
// },