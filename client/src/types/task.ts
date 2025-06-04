export type ProductType = 'Solar' | 'HVAC' | 'MPU' | 'Quiet Cool' | 'Service';

export type ProductStatus = 'not_started' | 'in_progress' | 'completed' | 'on_hold';

export type TaskStatus = 'pending' | 'assigned' | 'in_progress' | 'completed' | 'blocked';

export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';

export type TaskEventType = 'assignment' | 'status_change' | 'note' | 'completion' | 'block';

export type TechnicianStatus = 'available' | 'assigned' | 'on_break' | 'unavailable';

export type EventStatus = 'pending' | 'in_progress' | 'completed' | 'blocked' | 'on_hold' | 'not_started' | 'assigned';

// Original Product interface (for backward compatibility)
export interface Product {
  id: string;
  type: ProductType;
  name: string;
  description?: string;
  projectId: string;
  status: ProductStatus;
  tasks: Task[];
}

// New Product Template System
export interface ProductTemplate {
  id: string;
  name: string;
  description?: string;
  type: ProductType;
  defaultEvents: EventTemplate[];
  isPublished: boolean; // Flag to indicate if template is published and selectable
  createdAt: string;
  updatedAt: string;
}

export interface EventTemplate {
  id: string;
  name: string;
  description?: string;
  defaultTasks: TaskTemplate[];
  order: number;
  statuses: StatusTemplate[];
}

export interface StatusTemplate {
  id: string;
  name: string;
  description?: string;
  order: number;
  isFinal: boolean; // Indicates if this is the final status (will be shown in green)
}

export interface Status {
  id: string;
  name: string;
  description?: string;
  order: number;
  isFinal: boolean; // Indicates if this is the final status (will be shown in green)
  timestamp?: string; // When the status was set
  setBy?: string; // User ID who set this status
}

export interface TaskTemplate {
  id: string;
  name: string;
  description?: string;
  estimatedHours: number;
  requiredRoles?: string[];
  priority?: TaskPriority;
}

// Project-Product Association
export interface ProjectProduct {
  id: string;
  projectId: string;
  productTemplateId: string;
  productTemplate: ProductTemplate;
  name: string; // Product name
  description?: string; // Product description
  type: ProductType; // Product type
  events: ProjectEvent[];
  status: ProductStatus;
  tasks: Task[]; // Tasks associated with this product
  createdAt: string;
  updatedAt: string;
}

export interface ProjectEvent {
  id: string;
  projectProductId: string;
  templateId: string;
  name: string;
  description?: string;
  scheduledDate?: string;
  completedDate?: string;
  status: EventStatus;
  currentStatusId: string; // ID of the current status in the statuses array
  statuses: Status[];
  tasks: Task[];
  order: number;
}

export interface Task {
  id: string;
  name: string;
  description?: string;
  productId: string;
  status: TaskStatus;
  priority: TaskPriority;
  estimatedHours?: number;
  actualHours?: number;
  startDate?: Date;
  dueDate?: Date;
  assignedTo: string[]; // Array of technician IDs
  events: TaskEvent[];
  dependencies?: string[]; // Array of task IDs this task depends on
}

export interface TaskEvent {
  id: string;
  taskId: string;
  type: TaskEventType;
  createdBy: string; // User ID
  createdAt: Date;
  description: string;
  metadata?: Record<string, any>;
}

export interface Technician {
  id: string;
  name: string;
  role: string;
  skills: string[]; // e.g., ['solar_install', 'hvac_repair']
  contact: {
    phone: string;
    email: string;
  };
  status: TechnicianStatus;
  currentLocation?: {
    lat: number;
    lng: number;
    lastUpdated: Date;
  };
}

export interface Project {
  _id?: string;
  id?: string; // For compatibility
  name: string; // Could be derived from Homeowner or a specific project name field
  address: string;
  latitude?: number;  // Optional: to be populated by geocoding
  longitude?: number; // Optional: to be populated by geocoding
  location?: {
    lat: number;
    lng: number;
  };
  status: string; // General status, can be refined from your CSV (e.g., 'Active', 'NTP')
  client?: string; // Client or homeowner name
  homeownerName?: string; // From 'Homeowner' column
  saleDate?: string; // From 'Sale Date' column
  startDate?: string | Date; // Project start date
  endDate?: string | Date; // Project end date
  projectType?: string; // Can be derived from 'Products' column (e.g., 'Solar', 'HVAC')
  // Add other relevant fields from your CSV data as needed
  // For example:
  // contractAmount?: number;
  // systemSizeWatts?: number;
  // salesRep?: string;
}
