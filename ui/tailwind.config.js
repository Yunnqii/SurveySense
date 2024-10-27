/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        // 在这里添加您的自定义颜色
        "custom-blue": "#1fb6ff",
        "custom-purple": "#7e5bef",
        // 可以添加更多颜色...
      },
    },
  },
  plugins: [],
};
