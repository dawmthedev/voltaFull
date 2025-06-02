import React from "react";
import { AuthProvider } from "../../hooks/useAuth";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../../store";

export const themeColor = "#8661F4";

// Tailwind CSS custom theme values can be set in tailwind.config.js
// This value is kept for reference in components

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <ReduxProvider store={store}>
        <AuthProvider>{children}</AuthProvider>
      </ReduxProvider>
    </div>
  );
}
