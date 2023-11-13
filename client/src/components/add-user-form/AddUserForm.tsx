import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';
import CustomInput from '../input/CustomInput';

interface AddNewUserProps {
  user: {
    name: string;
    role: string;
  };
  getUsersData: (value: string, name: string) => void;
}

const AddUserForm = ({ user, getUsersData }: AddNewUserProps) => {
  return (
    <div>
      <CustomInput value={user.name} onChange={(e) => getUsersData(e.target.value, e.target.name)} name="name" label="Name" />
      <FormControl fullWidth sx={{ mt: '.8rem' }}>
        <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
        <Select
          value={user.role}
          label="Select Role"
          name="role"
          onChange={(e: SelectChangeEvent) => {
            getUsersData(e.target.value, e.target.name);
          }}
        >
          {roles?.map(({ name, value }: { name: string; value: string }) => (
            <MenuItem key={name} value={value}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default AddUserForm;

// const roles = ['CRM System Administrator', 'Sales Rep'];

const roles = [
  {
    name: 'CRM System Administrator',
    value: 'CRM System Administrator'
  },
  {
    name: 'Sales Rep',
    value: 'salesrep'
  },
  {
    name: 'Manager',
    value: 'manager'
  }
];
