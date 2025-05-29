import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../apiConfig";

export interface PayableRecord {
  _id: string;
  project: string;
  technician: string;
}

interface AccountsPayableState {
  items: PayableRecord[];
  status: "idle" | "loading" | "failed";
}

const initialState: AccountsPayableState = {
  items: [],
  status: "idle",
};

export const fetchUnpaid = createAsyncThunk("accountsPayable/fetchUnpaid", async () => {
  const res = await fetch(`${baseURL}/accounts-payable/unpaid`);
  if (!res.ok) throw new Error("Failed to load payable records");
  const data = await res.json();
  return data.data as PayableRecord[];
});

export const markPaid = createAsyncThunk("accountsPayable/markPaid", async (id: string) => {
  const res = await fetch(`${baseURL}/accounts-payable/${id}/paid`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to mark record paid");
  const data = await res.json();
  return data.data as PayableRecord;
});

const accountsPayableSlice = createSlice({
  name: "accountsPayable",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnpaid.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUnpaid.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(fetchUnpaid.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(markPaid.pending, (state, action) => {
        state.items = state.items.filter((r) => r._id !== action.meta.arg);
      });
  },
});

export default accountsPayableSlice.reducer;
