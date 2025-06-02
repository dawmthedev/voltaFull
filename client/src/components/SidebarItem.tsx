import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLayout } from "./Layout";

export interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  isOpen: boolean;
  onNavigate?: () => void;
  className?: string;
}
const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  to,
  isOpen,
  onNavigate,
  className,
}) => {
  const { closeSidebar } = useLayout();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    closeSidebar();
    onNavigate?.();
  };

  return (
    <NavLink 
      to={to} 
      onClick={handleClick}
      className={({ isActive }) => 
        `block group rounded-lg transition-colors duration-150 ${isActive 
          ? 'bg-teal-50 dark:bg-gray-800 text-teal-600 dark:text-teal-400 font-medium'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
        } ${className || ''}`
      }
      onMouseEnter={() => !isOpen && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className={`flex items-center gap-3 ${isOpen ? 'px-3 py-2.5' : 'p-2.5'}`}>
        {React.createElement(icon, { className: "h-5 w-5 flex-shrink-0" })}
        {isOpen && <span className="text-sm font-medium transition-opacity duration-200 ease-in-out group-hover:text-inherit">{label}</span>}
      </div>
      {/* Tooltip */}
      {showTooltip && !isOpen && (
        <div className="absolute left-full ml-2 px-2 py-1 text-xs bg-gray-700 dark:bg-gray-800 text-white rounded-md shadow-lg z-50 whitespace-nowrap">
          {label}
        </div>
      )}
    </NavLink>
  );
};

export default SidebarItem;
