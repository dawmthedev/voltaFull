export type LeadsTypes = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  categoryId: string;
};

export type CategoryTypes = {
  name: string;
  description: string;
};

export type CategoryResponseTypes = {
  id: string;
  name: string;
  description: string;
  adminId: string;
  orgId: string;
};

export type RegisterOrgTypes = {
  id?: string;
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  company: string;
  agree?: boolean;
  verifyCode?: string;
};
