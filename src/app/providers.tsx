"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import { Provider } from "react-redux";
import { store } from "@/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}
