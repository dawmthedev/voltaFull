import React from 'react'
import { Select } from '@chakra-ui/react'

export interface UserOption {
  _id: string
  name: string
  email: string
}

interface UserDropdownProps {
  users: UserOption[]
  value: string
  onChange: (val: string) => void
}

const UserDropdown: React.FC<UserDropdownProps> = ({ users, value, onChange }) => {
  return (
    <Select placeholder="Assigned To" value={value} onChange={e => onChange(e.target.value)}>
      {users.map(u => (
        <option key={u._id} value={u.email}>
          {u.name} ({u.email})
        </option>
      ))}
    </Select>
  )
}

export default UserDropdown
