import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import { AuthProvider } from "../../hooks/useAuth";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../../store";

export const themeColor = "#8661F4";

export const customTheme = extendTheme({
  colors: { primary: themeColor },
  fonts: { heading: "Inter, sans-serif", body: "Inter, sans-serif" },
  config: { initialColorMode: "light", useSystemColorMode: false },
});

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={customTheme}>
      <ReduxProvider store={store}>
        <AuthProvider>{children}</AuthProvider>
      </ReduxProvider>
    </ChakraProvider>
  );
}
