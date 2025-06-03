import React from "react";
import {
  FaThLarge,
  FaUsersCog,
  FaFileInvoiceDollar,
  FaCog,
  FaUserCircle,
  FaSignOutAlt,
  FaMap,
  FaUsers,
} from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../store";
import { logout } from "../store/authSlice";
import SidebarItem from "./SidebarItem";
import ThemeToggle from "./ThemeToggle";
import { useLayout } from "./Layout";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  toggleRef?: React.RefObject<HTMLButtonElement>;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen = true,
  onClose,
  toggleRef,
}) => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const { closeSidebar } = useLayout();
  // Tailwind handles colors via dark: prefix

  const handleClose = () => {
    onClose?.();
    toggleRef?.current?.focus();
  };

  const content = (
    <div
      className="w-full md:w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 
      dark:border-gray-700 flex flex-col shadow-lg transform transition-all duration-300 ease-in-out 
      md:translate-x-0 touch-pan-y overscroll-none"
    >
      <div className="flex-1 flex flex-col gap-4 px-4 pt-5">
        <div className="mb-8 flex items-center justify-between">
          <span
            className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-cyan-500 
            bg-clip-text text-transparent"
          >
            Volta
          </span>
          <button
            onClick={onClose}
            className="md:hidden rounded-full p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95 transition-transform"
          >
            ×
          </button>
        </div>

        {/* Mobile-optimized navigation items */}
        <div className="space-y-1.5">
          <SidebarItem
            icon={FaThLarge}
            label="Projects"
            to="/dashboard/projects"
            isOpen={true}
            onNavigate={closeSidebar}
          />
          {user?.role === "Technician" && (
            <SidebarItem
              icon={FaCog}
              label="Technician Allocation"
              to="/dashboard/technician"
              isOpen={true}
              onNavigate={closeSidebar}
            />
          )}
          {user?.role === "Admin" && (
            <>
              <SidebarItem
                icon={FaFileInvoiceDollar}
                label="Accounts Payable"
                to="/dashboard/accounts"
                isOpen={true}
                onNavigate={closeSidebar}
              />
              <SidebarItem
                icon={FaUsersCog}
                label="Users"
                to="/dashboard/users"
                isOpen={true}
                onNavigate={closeSidebar}
              />
              <SidebarItem
                icon={(props) => (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    {...props}
                  >
                    <path d="M11.644 1.59a.75.75 0 0 1 .712 0l9.75 5.25a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.712 0l-9.75-5.25a.75.75 0 0 1 0-1.32l9.75-5.25Z" />
                    <path d="m3.265 10.602 7.668 4.129a2.25 2.25 0 0 0 2.134 0l7.668-4.13 1.37.739a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.71 0l-9.75-5.25a.75.75 0 0 1 0-1.32l1.37-.738Z" />
                    <path d="m10.933 19.231-7.668-4.13-1.37.739a.75.75 0 0 0 0 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 0 0 0-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 0 1-2.134-.001Z" />
                  </svg>
                )}
                label="Product Templates"
                to="/dashboard/product-templates"
                isOpen={true}
                onNavigate={closeSidebar}
              />
              {/* Project Map functionality merged into Project Locations */}
              <SidebarItem
                icon={FaUsers}
                label="Technician Map"
                to="/dashboard/technicians"
                isOpen={true}
                onNavigate={closeSidebar}
              />
              <SidebarItem
                icon={FaMap}
                label="Project Locations"
                to="/dashboard/project-locations"
                isOpen={true}
                onNavigate={closeSidebar}
              />
            </>
          )}
          <SidebarItem
            icon={FaUserCircle}
            label="Profile"
            to="/dashboard/profile"
            isOpen={true}
            onNavigate={closeSidebar}
          />
        </div>
      </div>

      <div className="mt-auto px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center py-4 mb-4 gap-3">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Settings
          </span>
          <ThemeToggle size="sm" />
        </div>
        <button
          onClick={() => dispatch(logout())}
          className="w-full px-3 py-2.5 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-150 flex items-center gap-3 group"
        >
          <FaSignOutAlt className="h-5 w-5 transform group-hover:scale-105 transition-transform" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile drawer with touch gestures */}
      {isOpen && (
        <div className="touch-pan-y overscroll-none md:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          ></div>
          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 max-w-[85%] w-full">
            {content}
          </div>
        </div>
      )}

      {/* Desktop slide */}
      <div
        className={`hidden md:block h-screen flex-shrink-0 z-20 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {content}
      </div>
    </>
  );
};

export default Sidebar;
