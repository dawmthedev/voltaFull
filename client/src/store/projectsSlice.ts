import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../apiConfig";

export interface PayrollItem {
  technicianId: string;
  percentage: number;
  amountDue?: number;
  paid?: boolean;
}

export interface Project {
  _id?: string;
  homeowner: string;
  saleDate?: string;
  products?: string[];
  status?: string;
  stage?: string;
  contractAmount?: number;
  systemSize?: string;
  installer?: string;
  phone?: string;
  address?: string;
  utilityCompany?: string;
  salesRep?: string;
  salesRepId?: string;
  projectManager?: string;
  financing?: string;
  source?: string;
  ahj?: string;
  qcStatus?: string;
  ptoStatus?: string;
  duration?: string;
  assignedTo?: string | null; // Make it optional and nullable
  piecemealPercent?: number;
  payroll?: PayrollItem[];
  technicians?: string[];
  startDate?: string;
  estimatedCompletionDate?: string;
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
      body: JSON.stringify({
        ...project,
        assignedTo: project.assignedTo || undefined, // Convert null to undefined
      }),
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

interface UpdateProjectPayrollParams {
  id: string;
  payroll: {
    technicianId: string;
    percentage: number;
    paid?: boolean;
  }[];
  piecemealPercent: number;
}

export const updateProjectPayroll = createAsyncThunk(
  "projects/updatePayroll",
  async ({ id, payroll, piecemealPercent }: UpdateProjectPayrollParams) => {
    const response = await fetch(`/api/projects/${id}/payroll`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payroll, piecemealPercent }),
    });
    if (!response.ok) throw new Error("Failed to update project payroll");
    return response.json();
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

export const projectsApi = createApi({
  reducerPath: "projectsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Project"],
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: ({ page, pageSize }) =>
        `/projects?page=${page}&pageSize=${pageSize}`,
      providesTags: ["Project"],
    }),
    updateProject: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/projects/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Project"],
    }),
  }),
});

export const { useGetProjectsQuery, useUpdateProjectMutation } = projectsApi;

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
