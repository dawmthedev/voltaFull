import React from 'react';

export interface PlannerFormProps {
  state: Record<string, any>;
  categories?: any[];
  getFormData?: ({ name, value }: { name: string; value: any }) => void;
  error?: Record<string, string>;
  children?: React.ReactNode;
}

const PlannerForm: React.FC<PlannerFormProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default PlannerForm;
