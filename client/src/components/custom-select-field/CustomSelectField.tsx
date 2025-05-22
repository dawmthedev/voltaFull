import React from 'react';

export interface Option {
  label: string;
  value: string;
}

export interface CustomSelectFieldProps {
  options: Option[];
  value: string;
  onChange?: (value: string) => void;
}

const CustomSelectField: React.FC<CustomSelectFieldProps> = ({ options, value, onChange }) => {
  return (
    <select value={value} onChange={(e) => onChange && onChange(e.target.value)}>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
};

export default CustomSelectField;
