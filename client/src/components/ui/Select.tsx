import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { cn } from '../../utils/cn'; // Adjusted relative path

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  className?: string;
  onChange?: (value: string) => void; // Return only the value for simplicity
}

const Select: React.FC<SelectProps> = ({
  options,
  label,
  placeholder,
  error,
  helperText,
  className = '',
  value,
  onChange,
  disabled,
  ...props
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label
          htmlFor={props.id || props.name}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={cn(
            'block w-full appearance-none rounded-lg border-0 py-2.5 px-4 pr-8',
            'bg-white dark:bg-gray-800',
            'text-gray-900 dark:text-gray-100',
            'shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600',
            'placeholder:text-gray-400 dark:placeholder:text-gray-500',
            'focus:ring-2 focus:ring-inset focus:ring-teal-500 dark:focus:ring-teal-400',
            'transition-shadow duration-200',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error ? 'ring-red-500 dark:ring-red-400 focus:ring-red-500 dark:focus:ring-red-400' : '',
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map(option => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
      {helperText && !error && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
      {error && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default Select;
