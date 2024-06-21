export type LeadsTypes = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  categoryId: string;
};

export type CategoryTypes = {
  [x: string]: any;
  name: string;
  description: string;
};

export type CategoryResponseTypes = {
  id: string;
  name: string;
  description: string;
  adminId: string;
  orgId: string;
  fields: FieldTypes[];
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

export type FieldTypes = {
  name: string;
  type: string;
};

export type PlannerDataTypes = {
  title?: string;
  action?: string;
  description?: string;
  startDate: string;
  timeOfExecution: string;
  source: string;
};

export type AvailabilityDataTypes = {
  startDate: string;
  endDate: string;
};

export type AvailabilityResponseTypes = {
  id: string;
  startDate: string;
  endDate: string;
  adminId: string;
};


export type RoleDataTypes = {
  _id?: string;
  name: string;
};

export type PlannerResponseTypes = {
  _id: string;
  title: string;
  action: string;
  description: string;
  startDate: string;
  timeOfExecution: string;
  adminId: string;
};

export type AdminResponseTypes = {
  id: string;
  name: string;
  role: string;
  company: string;
  email: string;
  unlocked: string;
  recordID: string;
  twoFactorEnabled: boolean;
  orgId: string;
  token: string;
  isSuperAdmin: boolean;
};

export type LeadValueTypes = {
  name: string;
  type: string;
  value: string;
};
