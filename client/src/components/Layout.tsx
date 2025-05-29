import React, { createContext, useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

interface LayoutContextValue {
  closeSidebar: () => void;
}

export const LayoutContext = createContext<LayoutContextValue>({ closeSidebar: () => {} });
export const useLayout = () => useContext(LayoutContext);

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
      <div className="flex h-screen overflow-hidden">
        {isSidebarOpen && (
          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} toggleRef={toggleRef} />
        )}
        <div className="flex-1 flex flex-col">
          <Navbar onToggleSidebar={toggleSidebar} toggleRef={toggleRef} />
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <Outlet />
          </div>
        </div>
      </div>
    </LayoutContext.Provider>
  );
};

export default Layout;
