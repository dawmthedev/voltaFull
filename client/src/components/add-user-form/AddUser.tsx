import React from 'react';

export interface AddUserProps {
  onClose?: () => void;
}

const AddUser: React.FC<AddUserProps> = () => {
  return <div>Add User</div>;
};

export default AddUser;
