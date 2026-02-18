/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        pink: {
          DEFAULT: "var(--pink)",
          light: "var(--pink-light)",
          dim: "var(--pink-dim)",
        },
        blue: {
          DEFAULT: "var(--blue)",
          light: "var(--blue-light)",
          dim: "var(--blue-dim)",
        },
        page: "var(--bg-page)",
        card: {
          DEFAULT: "var(--bg-card)",
          alt: "var(--bg-card-alt)",
          dim: "var(--bg-card-dim)",
        },
        folder: "var(--bg-folder)",
        topbar: "var(--bg-topbar)",
        sidebar: {
          DEFAULT: "var(--bg-sidebar)",
          mid: "var(--bg-side-mid)",
          hi: "var(--bg-side-hi)",
        },
        modal: "var(--bg-modal)",
        overlay: "var(--bg-overlay)",
        border: {
          DEFAULT: "var(--border)",
          folder: "var(--border-folder)",
        },
        text: {
          primary: "var(--text-primary)",
          mid: "var(--text-mid)",
          light: "var(--text-light)",
        },
      },
      fontFamily: {
        serif: ["Fraunces", "serif"],
        sans: ["Poppins", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
      boxShadow: {
        md: "var(--shadow-md)",
        modal: "var(--shadow-modal)",
      },
    },
  },
  plugins: [],
};
