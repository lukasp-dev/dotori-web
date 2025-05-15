import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    mode: "light" | "dark";
    colors: {
      border: string;
      textPrimary: string;
      textSecondary: string;
      textHover: string;
      primary: string;
      white: string;
    };
  }
}
