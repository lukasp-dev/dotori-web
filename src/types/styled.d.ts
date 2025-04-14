// src/styles/theme.ts

const theme = {
  colors: {
    border: "#e5e7eb",
    textPrimary: "#59421a",
    textHover: "#b78657",
    primary: "#b06b47",
    background: "#dfefc3",
    white: "#ffffff",
  },
} as const;

export type ThemeType = typeof theme;

export default theme;
