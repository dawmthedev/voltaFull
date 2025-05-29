import { PlatformTest } from "@tsed/common";
import SuperTest from "supertest";
import { Server } from "../../server/src/Server";
import { AccountsPayableService } from "../../server/src/services/AccountsPayableService";

describe("AccountsPayableController", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;
  let service: AccountsPayableService;

  beforeEach(PlatformTest.bootstrap(Server));
  beforeEach(() => {
    request = SuperTest(PlatformTest.callback());
    service = PlatformTest.injector.get(AccountsPayableService)!;
  });

  afterEach(PlatformTest.reset);

  it("GET /accounts-payable", async () => {
    const items = [{ _id: "1" }] as any;
    jest.spyOn(service, "listByPaidStatus").mockResolvedValue(items);

    const res = await request.get("/rest/accounts-payable").query({ paid: "false" }).expect(200);

    expect(service.listByPaidStatus).toHaveBeenCalledWith(false);
    expect(res.body).toEqual({ success: true, data: items });
  });

  it("POST /projects/:id/accounts-payable", async () => {
    const items = [{ _id: "1" }] as any;
    const payload = { allocations: [{ technicianId: "t", percentage: 50 }] };
    jest.spyOn(service, "upsertAllocations").mockResolvedValue(items);

    const res = await request
      .post("/rest/projects/p1/accounts-payable")
      .send(payload)
      .expect(200);

    expect(service.upsertAllocations).toHaveBeenCalledWith("p1", payload.allocations);
    expect(res.body).toEqual({ success: true, data: items });
  });

  it("PATCH /accounts-payable/:id/pay", async () => {
    const item = { _id: "1" } as any;
    jest.spyOn(service, "markPaid").mockResolvedValue(item);

    const res = await request.patch("/rest/accounts-payable/1/pay").expect(200);

    expect(service.markPaid).toHaveBeenCalledWith("1");
    expect(res.body).toEqual({ success: true, data: item });
  });
});
