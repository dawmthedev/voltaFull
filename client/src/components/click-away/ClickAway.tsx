import React from 'react';

export interface ClickAwayProps {
  children: React.ReactNode;
  onClickAway?: () => void;
}

const ClickAway: React.FC<ClickAwayProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default ClickAway;
