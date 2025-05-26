import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseURL } from '../apiConfig'

export interface Project {
  _id?: string
  homeowner?: string
  saleDate?: string
  products?: string[]
  contractAmount?: number
  status?: string
  stage?: string
  duration?: string
  systemSize?: string
  phone?: string
  address?: string
  installer?: string
  utilityCompany?: string
  salesRep?: string
  salesRepId?: string
  technicians?: string[]
  projectManager?: string
  financing?: string
  source?: string
  ahj?: string
  qcStatus?: string
  ptoStatus?: string
  assignedTo?: string
}

interface ProjectsState {
  items: Project[]
  status: 'idle' | 'loading' | 'failed'
}

const initialState: ProjectsState = {
  items: [],
  status: 'idle'
}

export const fetchProjects = createAsyncThunk('projects/fetch', async () => {
  const res = await fetch(`${baseURL}/projects`)
  if (!res.ok) throw new Error('Failed to load projects')
  const data = await res.json()
  return data.data as Project[]
})

export const createProject = createAsyncThunk(
  'projects/create',
  async (project: Partial<Project>) => {
    const res = await fetch(`${baseURL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project)
    })
    if (!res.ok) throw new Error('Failed to create project')
    const data = await res.json()
    return data.data as Project
  }
)

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProjects.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'idle'
        state.items = action.payload
      })
      .addCase(fetchProjects.rejected, state => {
        state.status = 'failed'
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
  }
})

export default projectsSlice.reducer
