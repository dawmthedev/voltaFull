import React, { useState } from 'react';

export interface RoleDataTypes {
  id: string;
  name: string;
}
export interface AddNewUserProps {
  user: { name: string; role: string; isSuperAdmin: boolean };
  getUsersData: (value: any, name: string) => void;
  roles: RoleDataTypes[];
}

const AddUserForm: React.FC<AddNewUserProps> = ({ user, getUsersData, roles }) => {
  const [checked, setChecked] = useState(user.isSuperAdmin);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    getUsersData(e.target.checked, 'isSuperAdmin');
  };

  return (
    <div>
      <input
        value={user.name}
        name="name"
        onChange={(e) => getUsersData(e.target.value, e.target.name)}
        placeholder="Name"
      />
      <select
        value={user.role}
        name="role"
        onChange={(e) => getUsersData(e.target.value, e.target.name)}
      >
        {roles.map((r) => (
          <option key={r.id} value={r.name}>
            {r.name}
          </option>
        ))}
      </select>
      <label>
        <input type="checkbox" checked={checked} onChange={handleChange} /> Super Admin
      </label>
    </div>
  );
};

export default AddUserForm;
