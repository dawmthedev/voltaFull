import React from "react";

interface PercentageInputProps {
  value: number | null;
  onChange: (value: number | null) => void;
  max?: number;
  isDisabled?: boolean;
  showWarning?: boolean;
  remainingPercent?: number;
  className?: string;
}

export const PercentageInput: React.FC<PercentageInputProps> = ({
  value,
  onChange,
  max = 100,
  isDisabled = false,
  showWarning = true,
  remainingPercent,
  className,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    if (rawValue === "") {
      onChange(null);
      return;
    }

    let numValue = Math.min(Number(rawValue), max);
    if (isNaN(numValue) || numValue < 0) {
      numValue = 0;
    }

    if (remainingPercent != null) {
      numValue = Math.min(numValue, remainingPercent);
    }

    onChange(numValue);
  };

  const isOverMax = value != null && value > (remainingPercent ?? max);

  return (
    <div className={className}>
      <div className="relative flex rounded-md shadow-sm">
        <input
          type="number"
          value={value ?? ""}
          onChange={handleChange}
          disabled={isDisabled}
          min={0}
          max={remainingPercent ?? max}
          step="0.1"
          className={`block w-full rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset 
            ${isOverMax ? "ring-red-300" : "ring-gray-300"} 
            placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
            disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 
            disabled:ring-gray-200 sm:text-sm sm:leading-6`}
        />
        <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
          %
        </span>
      </div>

      {showWarning && isOverMax && (
        <div className="mt-2 rounded-md bg-yellow-50 p-2">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-2">
              <p className="text-sm text-yellow-700">
                Cannot exceed {remainingPercent ?? max}%
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PercentageInput;
