import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../apiConfig";

export interface Project {
  _id?: string;
  id?: string;
  homeowner?: string;
  saleDate?: string;
  products?: string[];
  contractAmount?: number;
  status?: string;
  stage?: string;
  duration?: string;
  systemSize?: string;
  phone?: string;
  address?: string;
  installer?: string;
  utilityCompany?: string;
  salesRep?: string;
  salesRepId?: string;
  technicians?: any;
  projectManager?: string;
  financing?: string;
  source?: string;
  ahj?: string;
  qcStatus?: string;
  ptoStatus?: string;
  assignedTo?: string;
  payroll?: { technicianId: string; percentage: number; paid?: boolean }[];
  piecemealPercent?: number;
}

interface ProjectsState {
  items: Project[];
  status: "idle" | "loading" | "failed";
  current: Project | null;
  currentStatus: "idle" | "loading" | "failed";
}

const initialState: ProjectsState = {
  items: [],
  status: "idle",
  current: null,
  currentStatus: "idle",
};

export const fetchProjects = createAsyncThunk("projects/fetch", async () => {
  const res = await fetch(`${baseURL}/rest/projects`);
  if (!res.ok) throw new Error("Failed to load projects");
  const data = await res.json();
  const projects = data.data as Project[];
  return projects.map((p: any) => ({ ...p, _id: p._id || p.id }));
});

export const createProject = createAsyncThunk(
  "projects/create",
  async (project: Partial<Project>) => {
    const res = await fetch(`${baseURL}/rest/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    if (!res.ok) throw new Error("Failed to create project");
    const data = await res.json();
    const p = data.data as any;
    return { ...p, _id: p._id || p.id } as Project;
  }
);

export const fetchProjectById = createAsyncThunk(
  "projects/fetchById",
  async (id: string) => {
    const res = await fetch(`${baseURL}/rest/projects/${id}`);
    if (!res.ok) throw new Error("Failed to load project");
    const data = await res.json();
    const p = data.data as any;
    return { ...p, _id: p._id || p.id } as Project;
  }
);

export interface UpdateProjectPayrollParams {
  id: string;
  payroll: Array<{
    technicianId: string;
    percentage: number;
  }>;
  piecemealPercent: number;
}

export const updateProjectPayroll = createAsyncThunk(
  "projects/updatePayroll",
  async (params: UpdateProjectPayrollParams) => {
    const response = await fetch(
      `${baseURL}/rest/projects/${params.id}/payroll`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      }
    );
    if (!response.ok) throw new Error("Failed to update project payroll");
    const data = await response.json();
    return data.data;
  }
);

export const savePayroll = createAsyncThunk(
  "projects/savePayroll",
  async ({
    projectId,
    allocations,
  }: {
    projectId: string;
    allocations: { technicianId: string; percent: number }[];
  }) => {
    const res = await fetch(
      `${baseURL}/rest/projects/${projectId}/accounts-payable`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ allocations }),
      }
    );
    if (!res.ok) throw new Error("Failed to save payroll");
    return true;
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(fetchProjects.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(fetchProjectById.pending, (state) => {
        state.currentStatus = "loading";
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.currentStatus = "idle";
        state.current = action.payload;
      })
      .addCase(fetchProjectById.rejected, (state) => {
        state.currentStatus = "failed";
      })
      .addCase(updateProjectPayroll.fulfilled, (state, action) => {
        state.current = action.payload;
      });
  },
});

export default projectsSlice.reducer;
