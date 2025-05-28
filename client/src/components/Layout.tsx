import React from 'react';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const publicRoutes = ['/', '/login', '/register'];
  const location = useLocation();
  const showSidebar = !publicRoutes.includes(location.pathname);

  if (!showSidebar) {
    return <div className="h-screen overflow-auto">{children}</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-64 flex-shrink-0 border-r bg-white p-4">
        {/* navigation links */}
      </aside>
      <main className="flex-1 overflow-y-auto p-6 bg-gray-50">{children}</main>
    </div>
  );
};

export default Layout;
