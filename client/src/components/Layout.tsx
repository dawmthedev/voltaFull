import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiFolder, FiUsers, FiSettings } from 'react-icons/fi';
import { Spinner } from '@chakra-ui/react';
import { useAppSelector, useAppDispatch } from '../store';
import { logout } from '../store/authSlice';

interface LayoutProps {
  children: React.ReactNode;
}

const authRoutes = ['/dashboard', '/projects', '/teams', '/settings'];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const showSidebar = authRoutes.some((route) => location.pathname.startsWith(route));
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { token, user, status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  if (token && status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: FiHome },
    { to: '/projects', label: 'Projects', icon: FiFolder },
    { to: '/teams', label: 'Teams', icon: FiUsers },
    { to: '/settings', label: 'Settings', icon: FiSettings },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {showSidebar && (
        <>
          <div
            className={`fixed inset-0 z-40 bg-black/40 md:hidden ${sidebarOpen ? '' : 'hidden'}`}
            onClick={() => setSidebarOpen(false)}
          />
          <aside
            role="complementary"
            className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-md transition-transform md:static md:translate-x-0 ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } md:block`}
          >
            <button
              className="absolute right-2 top-2 p-1 text-gray-600 md:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <FiX size={20} />
            </button>
            <div className="flex h-full flex-col justify-between p-4">
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="flex items-center gap-3 rounded px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
              <button
                onClick={() => dispatch(logout())}
                className="mt-4 text-left text-sm text-red-600 hover:underline"
              >
                Logout
              </button>
            </div>
          </aside>
        </>
      )}

      <div className={`flex flex-1 flex-col ${showSidebar ? 'md:pl-64' : ''}`}>
        <header className="flex items-center justify-between border-b bg-white px-4 py-3">
          {showSidebar && (
            <button className="text-gray-600 md:hidden" onClick={() => setSidebarOpen(true)}>
              <FiMenu size={20} />
            </button>
          )}
          <h1 className="text-lg font-semibold">Volta CRM</h1>
          {user && status !== 'loading' ? (
            <div className="flex items-center gap-2">
              <img
                src={user.avatarUrl || 'https://api.dicebear.com/7.x/thumbs/svg?seed=voltauser'}
                alt={user.name}
                className="h-8 w-8 rounded"
              />
              <div className="hidden leading-tight md:block">
                <div className="text-sm font-semibold">{user.name}</div>
                <div className="text-xs text-gray-500">{user.role}</div>
              </div>
            </div>
          ) : status === 'loading' ? (
            <Spinner size="sm" />
          ) : null}
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
