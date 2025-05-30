import { model } from "mongoose";
import { PayrollSchema } from "../../server/src/models/PayrollModel";

describe("PayrollModel", () => {
  const Payroll = model("PayrollModelTest", PayrollSchema);

  it("fails validation when percentage over 100", () => {
    const doc = new Payroll({
      technicianId: "t1",
      projectId: "p1",
      percentage: 120,
      amountDue: 10
    });
    const err = doc.validateSync();
    expect(err?.errors["percentage"]).toBeDefined();
  });

  it("requires technicianId", () => {
    const doc = new Payroll({ projectId: "p1", percentage: 50, amountDue: 5 });
    const err = doc.validateSync();
    expect(err?.errors["technicianId"]).toBeDefined();
  });
});
