/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cf: {
          orange: '#F38020',
          darkOrange: '#D86B14',
          gray: '#36393A',
          lightGray: '#F5F5F5',
          border: '#E2E8F0',
          blue: '#056DFF',
          darkBlue: '#0051C7',
          sidebar: '#F9FAFB',
          text: '#1F2937',
          subtext: '#6B7280'
        },
        gpt: {
          bg: '#212121',
          sidebar: '#171717',
          input: '#2F2F2F',
          card: '#2F2F2F',
          border: '#3E3E3E',
          text: '#ECECEC',
          subtext: '#B4B4B4',
          userBubble: '#2F2F2F',
          accent: '#10A37F'
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace']
      }
    },
  },
  plugins: [],
}
