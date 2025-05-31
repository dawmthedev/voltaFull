import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../apiConfig";
import { userService } from "../services/userService";

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
  const res = await fetch(`${baseURL}/rest/users`);
  if (!res.ok) throw new Error("Failed to load users");
  const data = await res.json();
  const users = data.data as User[];
  return users.map((u: any) => ({ ...u, _id: u._id || u.id }));
});

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, role }: { id: string; role: string }) => {
    return await userService.updateRole(id, role);
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
