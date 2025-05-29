import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { LayoutContext } from './Layout';

const SidebarOnlyLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleRef = React.useRef<HTMLButtonElement>(null);

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
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </LayoutContext.Provider>
  );
};

export default SidebarOnlyLayout;
