import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = "",
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={`
            block w-full rounded-lg border-0 py-2.5 px-4
            bg-white dark:bg-gray-800 
            text-gray-900 dark:text-gray-100
            shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600
            placeholder:text-gray-400 dark:placeholder:text-gray-500
            focus:ring-2 focus:ring-inset focus:ring-teal-500 dark:focus:ring-teal-400
            transition-shadow duration-200
            ${icon ? "pl-10" : ""}
            ${error ? "ring-red-500 dark:ring-red-400" : ""}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default Input;
