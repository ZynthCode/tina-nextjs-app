import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-light": "var(--color-primary-light)",
        "primary-dark": "var(--color-primary-dark)",
        "primary-contrast": "var(--color-primary-contrast)",

        secondary: "var(--color-secondary)",
        "secondary-light": "var(--color-secondary-light)",
        "secondary-dark": "var(--color-secondary-dark)",
        "secondary-contrast": "var(--color-secondary-contrast)",

        "background-primary": "var(--color-background-primary)",
        "background-secondary": "var(--color-background-secondary)",

        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-link": "var(--color-text-link)",

        "footer-text": "var(--color-footer-text)",

        warning: "var(--color-warning)",
        "warning-light": "var(--color-warning-light)",
        "warning-dark": "var(--color-warning-dark)",
        "warning-contrast": "var(--color-warning-contrast)",
      },
    },
  },
  plugins: [],
};
export default config;
