import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { baseURL } from "../apiConfig";
import { ProductTemplate, EventTemplate, TaskTemplate } from "../types/task";

interface ProductTemplatesState {
  items: ProductTemplate[];
  status: "idle" | "loading" | "failed";
  current: ProductTemplate | null;
  currentStatus: "idle" | "loading" | "failed";
}

const initialState: ProductTemplatesState = {
  items: [],
  status: "idle",
  current: null,
  currentStatus: "idle",
};

// Async thunks for product templates
export const fetchProductTemplates = createAsyncThunk(
  "productTemplates/fetch",
  async () => {
    const res = await fetch(`${baseURL}/rest/product-templates`);
    if (!res.ok) throw new Error("Failed to load product templates");
    const data = await res.json();
    return data.data as ProductTemplate[];
  }
);

export const fetchProductTemplateById = createAsyncThunk(
  "productTemplates/fetchById",
  async (id: string) => {
    const res = await fetch(`${baseURL}/rest/product-templates/${id}`);
    if (!res.ok) throw new Error("Failed to load product template");
    const data = await res.json();
    return data.data as ProductTemplate;
  }
);

export const createProductTemplate = createAsyncThunk(
  "productTemplates/create",
  async (template: Partial<ProductTemplate>) => {
    const res = await fetch(`${baseURL}/rest/product-templates`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(template),
    });
    if (!res.ok) throw new Error("Failed to create product template");
    const data = await res.json();
    return data.data as ProductTemplate;
  }
);

export const updateProductTemplate = createAsyncThunk(
  "productTemplates/update",
  async ({
    id,
    template,
  }: {
    id: string;
    template: Partial<ProductTemplate>;
  }) => {
    const res = await fetch(`${baseURL}/rest/product-templates/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(template),
    });
    if (!res.ok) throw new Error("Failed to update product template");
    const data = await res.json();
    return data.data as ProductTemplate;
  }
);

// RTK Query API
export const productTemplatesApi = createApi({
  reducerPath: "productTemplatesApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseURL}/rest` }),
  tagTypes: ["ProductTemplate"],
  endpoints: (builder) => ({
    getProductTemplates: builder.query<ProductTemplate[], void>({
      query: () => "/product-templates",
      transformResponse: (response: { data: ProductTemplate[] }) => response.data,
      providesTags: ["ProductTemplate"],
    }),
    getProductTemplateById: builder.query<ProductTemplate, string>({
      query: (id) => `/product-templates/${id}`,
      transformResponse: (response: { data: ProductTemplate }) => response.data,
      providesTags: ["ProductTemplate"],
    }),
    createProductTemplate: builder.mutation<
      ProductTemplate,
      Partial<ProductTemplate>
    >({
      query: (template) => ({
        url: "/product-templates",
        method: "POST",
        body: template,
      }),
      invalidatesTags: ["ProductTemplate"],
    }),
    updateProductTemplate: builder.mutation<
      ProductTemplate,
      { id: string; template: Partial<ProductTemplate> }
    >({
      query: ({ id, template }) => ({
        url: `/product-templates/${id}`,
        method: "PUT",
        body: template,
      }),
      invalidatesTags: ["ProductTemplate"],
    }),
    deleteProductTemplate: builder.mutation<void, string>({
      query: (id) => ({
        url: `/product-templates/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProductTemplate"],
    }),
  }),
});

export const {
  useGetProductTemplatesQuery,
  useGetProductTemplateByIdQuery,
  useCreateProductTemplateMutation,
  useUpdateProductTemplateMutation,
  useDeleteProductTemplateMutation,
} = productTemplatesApi;

// Slice
const productTemplatesSlice = createSlice({
  name: "productTemplates",
  initialState,
  reducers: {
    clearCurrentTemplate: (state) => {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductTemplates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProductTemplates.fulfilled,
        (state, action: PayloadAction<ProductTemplate[]>) => {
          state.status = "idle";
          state.items = action.payload;
        }
      )
      .addCase(fetchProductTemplates.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchProductTemplateById.pending, (state) => {
        state.currentStatus = "loading";
      })
      .addCase(
        fetchProductTemplateById.fulfilled,
        (state, action: PayloadAction<ProductTemplate>) => {
          state.currentStatus = "idle";
          state.current = action.payload;
        }
      )
      .addCase(fetchProductTemplateById.rejected, (state) => {
        state.currentStatus = "failed";
      })
      .addCase(
        createProductTemplate.fulfilled,
        (state, action: PayloadAction<ProductTemplate>) => {
          state.items.push(action.payload);
        }
      )
      .addCase(
        updateProductTemplate.fulfilled,
        (state, action: PayloadAction<ProductTemplate>) => {
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

export const { clearCurrentTemplate } = productTemplatesSlice.actions;
export default productTemplatesSlice.reducer;
