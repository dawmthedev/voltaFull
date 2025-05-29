import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../apiConfig";

export interface User {
  _id?: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  isSuperAdmin?: boolean;
  createdAt?: string;
}

interface UsersState {
  items: User[];
  status: "idle" | "loading" | "failed";
}

const initialState: UsersState = {
  items: [],
  status: "idle",
};

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const res = await fetch(`${baseURL}/users`);
  if (!res.ok) throw new Error("Failed to load users");
  const data = await res.json();
  return data.data as User[];
});

export const updateUser = createAsyncThunk(
  "users/update",
  async (
    { id, role }: { id: string; role: string },
    { dispatch }
  ) => {
    const res = await fetch(`${baseURL}/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    if (!res.ok) throw new Error("Failed to update user");
    await dispatch(fetchUsers());
    const data = await res.json();
    return data.data as User;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default usersSlice.reducer;
