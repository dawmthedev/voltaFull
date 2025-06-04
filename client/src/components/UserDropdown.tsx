import React from 'react';
import Select from './ui/Select'; // Changed to default import

export interface UserOption {
  _id: string
  name: string
  email: string
  role?: string
  region?: string
  org?: string
}

interface UserDropdownProps {
  users: UserOption[]
  value: string
  onChange: (val: string) => void
}

const UserDropdown: React.FC<UserDropdownProps> = ({ users, value, onChange }) => {
  const selectOptions = users.map(user => ({
    value: user.email, // Assuming email is the unique identifier used for the value
    label: `${user.name} (${user.email})`,
  }));

  return (
    <Select
      placeholder="Assigned To"
      value={value}
      onChange={onChange} // Our Select component likely passes the value directly
      options={selectOptions}
      // You might need to add a class for styling if default isn't enough
      // className="min-w-[200px]"
    />
  );
};

export default UserDropdown
