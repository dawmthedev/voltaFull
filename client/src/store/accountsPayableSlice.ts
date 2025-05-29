import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../apiConfig";

export interface PayableRecord {
  projectId: string;
  projectName: string;
  techId: string;
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

export const fetchUnpaid = createAsyncThunk("accountsPayable/fetchUnpaid", async () => {
  const res = await fetch(`${baseURL}/projects/accounts`);
  if (!res.ok) throw new Error("Failed to load payable records");
  const data = await res.json();
  const rows: PayableRecord[] = [];
  data.data.forEach((p: any) => {
    p.payroll.forEach((r: any) => {
      rows.push({
        projectId: p.projectId,
        projectName: p.projectName,
        techId: r.techId,
        allocationPct: r.allocationPct,
        amountDue: r.amountDue,
        paid: r.paid,
      });
    });
  });
  return rows;
});

export const markPaid = createAsyncThunk(
  "accountsPayable/markPaid",
  async ({ projectId, payroll }: { projectId: string; payroll: PayableRecord[] }) => {
    const res = await fetch(`${baseURL}/projects/${projectId}/payroll`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payroll }),
    });
    if (!res.ok) throw new Error("Failed to mark record paid");
    const data = await res.json();
    return data.data as any;
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
      .addCase(markPaid.pending, (state) => {
        state.status = "loading";
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
