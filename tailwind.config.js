/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './component/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      display: ["group-hover"],
      color: ["group-hover"],
      zIndex: {
        '2': '2',
        '1':'1',
        '10':'10'
      },
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif'],
        roboto: ['Poppins', 'sans-serif'],
        montserrat: ["Montserrat"],
        quicksand: ['Quicksand'],
      },
      backgroundColor: {
        primary: '#0A9F4D',
        secondary: '#3F51B5',
      },
      boxShadow:{
        'greenShadow':'0px 6px 11px 1px rgba(53, 162, 109, 0.29)',
        'faintBlack':'0px 6px 11px 1px rgba(0, 0, 0, 0.05)',
        'lightBlack':'0px 1px 26px 9px rgba(0, 0, 0, 0.05)',
        'faintShadow': '0px 18px 43px 10px rgba(0, 0, 0, 0.1)',
        'grayShadow':'-7px 13px 39px rgba(220, 224, 249, 0.22)',
        'cardShadow':'0px 7px 29px 0px rgba(100, 100, 111, 0.2)'
      },
      textColor: {
        primary: "#0A9F4D",
      },
      borderColor: {
        primary: "#0A9F4D",
        lightRed: '#FF484E',
        transparentGreen:'#49DB8A',
        gray: "#D5D5D5",
      },
      colors: {
        secondary: '#3F51B5',
        primary: "#0A9F4D",
        gray: "#D5D5D5",
        gray1: "#616161",
        gray2: "#9F9F9F",
        gray3: "#ECECEC",
        gray4: "#5A5A5A",
        gray5: "#EFE3F5",
        gray6:"#F8F8F8",
        gray7: '#C4C4C4',
        gray8:"#828282",
        gray9: "#D9D9D9",
        gray10: "#576B75",
        gray11:" #949494",
        darkGray:"#2F2E41",
        lightestGray: "#FAFAFA",
        dullGreen: "#EEF2C4",
        blue1: "#3F51B5",
        blue2: "#0886A2",
        blue3:"#BCD0F7",
        blue4:"#3277FB",
        yellow1: "#F9E215",
        lightGreen: "rgba(73, 219, 138, 0.22)",
        brightGreen: "#DAF1E4",
        lightRed: '#FF484E',
        cyanGreen: "#7CC59E",
        yellowGreen: "#CAE190",
        blue: "#5EB9CD",
        greenGray: "#F2F2F2",
        lemonGreen:"#CFFF9F",
        dullYellow:"#F0DE7F",
        greenYellow: "#C3B000",
        faintOrange:"#FFC58F",
        pinkishRed:"#FB8181",
        tomatoRed: "#E7050C",
        orangeRed: "#FB2C33",
        lightGray:"rgba(235, 235, 235, 0.4)",
        teal:"#02B7AC",
        blueShade:"#216EFF",
        bgLightBlack:"rgba(0, 0, 0, 0.4)",
        bgLightBlack2:"rgba(0, 0, 0, 0.1)"
      },
    },
  },
  plugins: [],
}