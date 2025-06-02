import React from "react";
import { FiMenu } from "react-icons/fi";
import UserAvatar from "./UserAvatar";

interface NavbarProps {
  onToggleSidebar: () => void;
  toggleRef: React.RefObject<HTMLButtonElement>;
  className?: string;
}
const Navbar: React.FC<NavbarProps> = ({
  onToggleSidebar,
  toggleRef,
  className,
}) => {
  return (
    <nav 
      className={`flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3 ${className || ''}`}
    >
      <div className="flex items-center gap-2">
        <button
          ref={toggleRef}
          aria-label="Toggle sidebar"
          onClick={onToggleSidebar}
          className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          <FiMenu />
        </button>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200 hidden sm:block">Volta CRM</h1>
      </div>
      <UserAvatar />  
    </nav>
  );
};

export default Navbar;
