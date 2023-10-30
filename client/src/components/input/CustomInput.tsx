import { TextField } from '@mui/material';
import React from 'react';

interface CustomInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
  type?: 'text' | 'number' | 'password' | 'email' | 'tel' | 'url' | 'search';
  size?: 'small' | 'medium';
}

const CustomInput = ({ type = 'text', value, name, label, size = 'medium', onChange }: CustomInputProps) => {
  return (
    <TextField
      type={type}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
      name={name}
      label={label}
      fullWidth={true}
      sx={{ my: 1 }}
      size={size}
    />
  );
};

export default CustomInput;
