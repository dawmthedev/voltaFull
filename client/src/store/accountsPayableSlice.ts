import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../apiConfig";

export interface PayableRecord {
  _id: string;
  project: string;
  technician: string;
  allocationPct: number;
  amountDue: number;
  paid: boolean;
}

interface AccountsPayableState {
  items: PayableRecord[];
  status: "idle" | "loading" | "failed";
}

const initialState: AccountsPayableState = {
  items: [],
  status: "idle",
};

export const fetchUnpaid = createAsyncThunk(
  "accountsPayable/fetchUnpaid",
  async () => {
    const res = await fetch(`${baseURL}/rest/accounts-payable?paid=false`);
    if (!res.ok) throw new Error("Failed to load payable records");
    const data = await res.json();
    return (data.data as any[]).map((r: any) => ({
      _id: r._id,
      project: (r.projectId as any).homeowner,
      technician: (r.technicianId as any).name,
      allocationPct: r.percentage,
      amountDue: r.amountDue,
      paid: r.paid,
    })) as PayableRecord[];
  }
);

export const markPaid = createAsyncThunk(
  "accountsPayable/markPaid",
  async (id: string) => {
    const res = await fetch(`${baseURL}/rest/accounts-payable/${id}/pay`, {
      method: "PATCH",
    });
    if (!res.ok) throw new Error("Failed to mark record paid");
    const data = await res.json();
    return data.data as PayableRecord;
  }
);

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
      })
      .addCase(markPaid.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(markPaid.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default accountsPayableSlice.reducer;
