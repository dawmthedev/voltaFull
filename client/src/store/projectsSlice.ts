import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../apiConfig";

export interface Project {
  _id?: string;
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
  const res = await fetch(`${baseURL}/projects`);
  if (!res.ok) throw new Error("Failed to load projects");
  const data = await res.json();
  return data.data as Project[];
});

export const createProject = createAsyncThunk(
  "projects/create",
  async (project: Partial<Project>) => {
    const res = await fetch(`${baseURL}/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    if (!res.ok) throw new Error("Failed to create project");
    const data = await res.json();
    return data.data as Project;
  }
);

export const fetchProjectById = createAsyncThunk(
  "projects/fetchById",
  async (id: string) => {
    const res = await fetch(`${baseURL}/projects/${id}`);
    if (!res.ok) throw new Error("Failed to load project");
    const data = await res.json();
    return data.data as Project;
  }
);

export const updateProjectPayroll = createAsyncThunk(
  "projects/updatePayroll",
  async (
    { id, technicians }: { id: string; technicians: any[] },
    { dispatch }
  ) => {
    const res = await fetch(`${baseURL}/projects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ technicians }),
    });
    if (!res.ok) throw new Error("Failed to update project payroll");
    await dispatch(fetchProjectById(id));
    const data = await res.json();
    return data.data as Project;
  }
);

export const savePayroll = createAsyncThunk(
  "projects/savePayroll",
  async ({ projectId, allocations }: { projectId: string; allocations: { technicianId: string; percent: number }[] }) => {
    const res = await fetch(`/api/projects/${projectId}/accounts-payable`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ allocations }),
    });
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
