/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        kaushan:"Kaushan Script,cursive",
        archivo:"Archivo, sans-serif",
      },
      fontSize:{
        custom_3xl:"32px",
      },
      lineHeight:{
        '108':"108%",
        '130':'130%',
        '145':'145%',
      },
    colors:{
      'fade-green':'#6E9277',
      'dark-black':'#001008',
      'dark-grey':'#001008B2',
      'grey':'#696969',
      'off-white':'#FFFFFF52',
      'light-grey':'#0010080F',
      'light-green':'#F1FFF5',
      'fade-grey':'#929693'
    },
    boxShadow:{
      dropdown:'0px 10px 20px 0px #00000026',
    }
    },
  },
  plugins: [],
};
