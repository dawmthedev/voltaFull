import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';
import CustomInput from '../input/CustomInput';

interface AddNewUserProps {
  user: {
    email: string;
    role: string;
  };
  getUsersData: (value: string, name: string) => void;
}

const AddUserForm = ({ user, getUsersData }: AddNewUserProps) => {
  return (
    <div>
      <CustomInput value={user.email} onChange={(e) => getUsersData(e.target.value, e.target.name)} name="email" label="Email address" />
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
          {roles?.map((role: string) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default AddUserForm;

const roles = ['Admin', 'Sales Rep'];
