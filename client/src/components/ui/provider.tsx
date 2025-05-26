import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import { AuthProvider } from "../../hooks/useAuth";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../../store";

const theme = extendTheme({
  fonts: { heading: "Inter, sans-serif", body: "Inter, sans-serif" },
  config: { initialColorMode: "light" },
});

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <ReduxProvider store={store}>
        <AuthProvider>{children}</AuthProvider>
      </ReduxProvider>
    </ChakraProvider>
  );
}
