import React, { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  LazyMotion,
  domAnimation,
  m,
} from "framer-motion";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface LayoutContextValue {
  closeSidebar: () => void;
}

export const LayoutContext = createContext<LayoutContextValue>({
  closeSidebar: () => {},
});
export const useLayout = () => useContext(LayoutContext);

interface NavbarProps {
  onToggleSidebar: () => void;
  toggleRef: React.RefObject<HTMLButtonElement>;
  className?: string;
}

// Create a type-safe wrapper for AnimatePresence
const SafeAnimatePresence: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <LazyMotion features={domAnimation}>
    <m.div>{children}</m.div>
  </LazyMotion>
);

const Layout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleRef = React.useRef<HTMLButtonElement>(null);

  const toggleSidebar = () => setSidebarOpen((o) => !o);
  const closeSidebar = () => {
    setSidebarOpen(false);
    toggleRef.current?.focus();
  };

  return (
    <LayoutContext.Provider value={{ closeSidebar }}>
      <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950 transition-colors">
        <SafeAnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="z-20 flex-shrink-0"
            >
              <Sidebar
                isOpen={isSidebarOpen}
                onClose={closeSidebar}
                toggleRef={toggleRef}
              />
            </motion.div>
          )}
        </SafeAnimatePresence>

        <div className="flex-1 flex flex-col min-w-0">
          <Navbar
            onToggleSidebar={toggleSidebar}
            toggleRef={toggleRef}
            className="z-10 sticky top-0 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
          />
          <main className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-900 relative">
            <div className="p-4 sm:p-6 lg:p-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </LayoutContext.Provider>
  );
};

export default Layout;
