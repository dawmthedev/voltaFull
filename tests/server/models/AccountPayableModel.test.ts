import mongoose from "mongoose";
import { AccountPayableModel } from "../../../server/src/models/AccountPayableModel";

describe("AccountPayableModel preSave", () => {
  it("computes amountDue from project", async () => {
    const findById = jest.fn().mockResolvedValue({ contractAmount: 1000 });
    jest.spyOn(mongoose, "model").mockReturnValue({ findById } as any);

    const doc: any = { projectId: "p1", allocationPercent: 25 };
    await AccountPayableModel.preSave(doc, () => {});

    expect(findById).toHaveBeenCalledWith("p1");
    expect(doc.amountDue).toBe(250);
  });
});
