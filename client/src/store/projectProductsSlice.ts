import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { baseURL } from "../apiConfig";
import { ProjectProduct, ProjectEvent, ProductTemplate } from "../types/task";

interface ProjectProductsState {
  items: ProjectProduct[];
  status: "idle" | "loading" | "failed";
  current: ProjectProduct | null;
  currentStatus: "idle" | "loading" | "failed";
}

const initialState: ProjectProductsState = {
  items: [],
  status: "idle",
  current: null,
  currentStatus: "idle",
};

// Async thunks for project products
export const fetchProjectProducts = createAsyncThunk(
  "projectProducts/fetch",
  async (projectId: string) => {
    const res = await fetch(`${baseURL}/rest/projects/${projectId}/products`);
    if (!res.ok) throw new Error("Failed to load project products");
    const data = await res.json();
    return data.data as ProjectProduct[];
  }
);

export const fetchProjectProductById = createAsyncThunk(
  "projectProducts/fetchById",
  async ({ projectId, productId }: { projectId: string; productId: string }) => {
    const res = await fetch(
      `${baseURL}/rest/projects/${projectId}/products/${productId}`
    );
    if (!res.ok) throw new Error("Failed to load project product");
    const data = await res.json();
    return data.data as ProjectProduct;
  }
);

export const addProductToProject = createAsyncThunk(
  "projectProducts/add",
  async ({
    projectId,
    productTemplateId,
  }: {
    projectId: string;
    productTemplateId: string;
  }) => {
    const res = await fetch(`${baseURL}/rest/projects/${projectId}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productTemplateId }),
    });
    if (!res.ok) throw new Error("Failed to add product to project");
    const data = await res.json();
    return data.data as ProjectProduct;
  }
);

export const updateProjectProductStatus = createAsyncThunk(
  "projectProducts/updateStatus",
  async ({
    projectId,
    productId,
    status,
  }: {
    projectId: string;
    productId: string;
    status: string;
  }) => {
    const res = await fetch(
      `${baseURL}/rest/projects/${projectId}/products/${productId}/status`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }
    );
    if (!res.ok) throw new Error("Failed to update product status");
    const data = await res.json();
    return data.data as ProjectProduct;
  }
);

// RTK Query API
export const projectProductsApi = createApi({
  reducerPath: "projectProductsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseURL}/rest` }),
  tagTypes: ["ProjectProduct", "ProjectEvent"],
  endpoints: (builder) => ({
    getProjectProducts: builder.query<ProjectProduct[], string>({
      query: (projectId) => `/projects/${projectId}/products`,
      transformResponse: (response: { data: ProjectProduct[] }) => response.data,
      providesTags: ["ProjectProduct"],
    }),
    getProjectProductById: builder.query<
      ProjectProduct,
      { projectId: string; productId: string }
    >({
      query: ({ projectId, productId }) =>
        `/projects/${projectId}/products/${productId}`,
      transformResponse: (response: { data: ProjectProduct }) => response.data,
      providesTags: ["ProjectProduct"],
    }),
    addProductToProject: builder.mutation<
      ProjectProduct,
      { projectId: string; productTemplateId: string }
    >({
      query: ({ projectId, productTemplateId }) => ({
        url: `/projects/${projectId}/products`,
        method: "POST",
        body: { productTemplateId },
      }),
      invalidatesTags: ["ProjectProduct"],
    }),
    updateProjectProduct: builder.mutation<
      ProjectProduct,
      {
        projectId: string;
        productId: string;
        update: Partial<ProjectProduct>;
      }
    >({
      query: ({ projectId, productId, update }) => ({
        url: `/projects/${projectId}/products/${productId}`,
        method: "PUT",
        body: update,
      }),
      invalidatesTags: ["ProjectProduct"],
    }),
    removeProductFromProject: builder.mutation<
      void,
      { projectId: string; productId: string }
    >({
      query: ({ projectId, productId }) => ({
        url: `/projects/${projectId}/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProjectProduct"],
    }),
    // Project Events endpoints
    getProjectEvents: builder.query<
      ProjectEvent[],
      { projectId: string; productId: string }
    >({
      query: ({ projectId, productId }) =>
        `/projects/${projectId}/products/${productId}/events`,
      transformResponse: (response: { data: ProjectEvent[] }) => response.data,
      providesTags: ["ProjectEvent"],
    }),
    updateProjectEvent: builder.mutation<
      ProjectEvent,
      {
        projectId: string;
        productId: string;
        eventId: string;
        update: Partial<ProjectEvent>;
      }
    >({
      query: ({ projectId, productId, eventId, update }) => ({
        url: `/projects/${projectId}/products/${productId}/events/${eventId}`,
        method: "PUT",
        body: update,
      }),
      invalidatesTags: ["ProjectEvent"],
    }),
    addCustomEvent: builder.mutation<
      ProjectEvent,
      {
        projectId: string;
        productId: string;
        event: Partial<ProjectEvent>;
      }
    >({
      query: ({ projectId, productId, event }) => ({
        url: `/projects/${projectId}/products/${productId}/events`,
        method: "POST",
        body: event,
      }),
      invalidatesTags: ["ProjectEvent"],
    }),
  }),
});

export const {
  useGetProjectProductsQuery,
  useGetProjectProductByIdQuery,
  useAddProductToProjectMutation,
  useUpdateProjectProductMutation,
  useRemoveProductFromProjectMutation,
  useGetProjectEventsQuery,
  useUpdateProjectEventMutation,
  useAddCustomEventMutation,
} = projectProductsApi;

// Slice
const projectProductsSlice = createSlice({
  name: "projectProducts",
  initialState,
  reducers: {
    clearCurrentProjectProduct: (state) => {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProjectProducts.fulfilled,
        (state, action: PayloadAction<ProjectProduct[]>) => {
          state.status = "idle";
          state.items = action.payload;
        }
      )
      .addCase(fetchProjectProducts.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchProjectProductById.pending, (state) => {
        state.currentStatus = "loading";
      })
      .addCase(
        fetchProjectProductById.fulfilled,
        (state, action: PayloadAction<ProjectProduct>) => {
          state.currentStatus = "idle";
          state.current = action.payload;
        }
      )
      .addCase(fetchProjectProductById.rejected, (state) => {
        state.currentStatus = "failed";
      })
      .addCase(
        addProductToProject.fulfilled,
        (state, action: PayloadAction<ProjectProduct>) => {
          state.items.push(action.payload);
        }
      )
      .addCase(
        updateProjectProductStatus.fulfilled,
        (state, action: PayloadAction<ProjectProduct>) => {
          const index = state.items.findIndex(
            (item) => item.id === action.payload.id
          );
          if (index !== -1) {
            state.items[index] = action.payload;
          }
          if (state.current?.id === action.payload.id) {
            state.current = action.payload;
          }
        }
      );
  },
});

export const { clearCurrentProjectProduct } = projectProductsSlice.actions;
export default projectProductsSlice.reducer;
