/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.js"],
  theme: {
    screens: {
      sm: { max: "600px" },
      md: { min: "600px", max: "1250px" },
      lg: { min: "1250px", max: "3000px" },
    },
    fontFamily: {
      sans: ["Noto Sans KR", "Noto Sans"],
    },
    extend: {
      textColor: {
        light: "#f1f1f1",
        dark: "#1d1b1e",
      },
      colors: {
        wpblue: {
          50: "#DBEFFF",
          100: "#B3DDFF",
          200: "#6BBCFF",
          300: "#1F9AFF",
          400: "#0073D1",
          500: "#004B87",
          600: "#003B6B",
          700: "#002D52",
          800: "#001F38",
          900: "#000E19",
          950: "#00080F",
        },
      },
      boxShadow: {
        dim: " 0 0 0 200vmax rgba(0, 0, 0, .3)",
        b: "0px 1px 8px #474747",
      },
      height: {
        128: "450px",
      },
      transitionProperty: {
        wsc: "width scale",
        hcol: "height backgroundColor",
      },
    },
  },
  plugins: [],
};
