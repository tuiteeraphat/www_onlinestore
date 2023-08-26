/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'topMenuBg': "#00ADB5",
        'topMenuFontColor': "#ffffff",
        'mainMenuBg': "#222831",
        'mainMenuBgBlur': "#222831cb",
        'menuBackdropBlurBgColor': "#6b7280a6",
        'mainMenuFontColor': "#ffffff",
        'footerBg': "#222831",
        'footerFontColor': "#ffffff",
        'buttonBg': "#00ADB5",
        'buttonRingColor': "#6cdfe6",
        'buttonFontColor': "#ffffff",
      },
    },
   
    
  },
  plugins: [
    require("flowbite/plugin")
  ],
}