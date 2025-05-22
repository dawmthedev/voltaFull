import React from 'react';

export interface CustomModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  children?: React.ReactNode;
  size?: string;
  handleSubmit?: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ open, setOpen, title, children, handleSubmit }) => {
  if (!open) return null;
  return (
    <div>
      <h3>{title}</h3>
      <div>{children}</div>
      <button onClick={() => setOpen(false)}>Close</button>
      {handleSubmit && <button onClick={handleSubmit}>Submit</button>}
    </div>
  );
};

export default CustomModal;
