import { PlatformTest } from "@tsed/common";
import SuperTest from "supertest";
import { Server } from "../../server/src/Server";
import { PayrollService } from "../../server/src/services/PayrollService";

describe("PayrollController", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;
  let service: PayrollService;

  beforeEach(PlatformTest.bootstrap(Server));
  beforeEach(() => {
    request = SuperTest(PlatformTest.callback());
    service = PlatformTest.injector.get(PayrollService)!;
  });

  afterEach(PlatformTest.reset);

  it("POST /projects/:id/payroll", async () => {
    const items = [{ _id: "1" }] as any;
    const payload = { payroll: [{ technicianId: "t1", percentage: 50 }] };
    jest.spyOn(service, "insert").mockResolvedValue(items);

    const res = await request
      .post("/rest/projects/p1/payroll")
      .send(payload)
      .expect(200);

    expect(service.insert).toHaveBeenCalledWith("p1", payload.payroll);
    expect(res.body).toEqual({ success: true, data: items });
  });

  it("GET /projects/:id/payroll", async () => {
    const items = [{ _id: "1" }] as any;
    jest.spyOn(service, "listForProject").mockResolvedValue(items);

    const res = await request.get("/rest/projects/p1/payroll").expect(200);

    expect(service.listForProject).toHaveBeenCalledWith("p1");
    expect(res.body).toEqual({ success: true, data: items });
  });

  it("GET /payroll", async () => {
    const items = [{ _id: "1" }] as any;
    jest.spyOn(service, "listAll").mockResolvedValue(items);

    const res = await request.get("/rest/payroll").expect(200);

    expect(service.listAll).toHaveBeenCalled();
    expect(res.body).toEqual({ success: true, data: items });
  });

  it("PATCH /payroll/:id/paid", async () => {
    const item = { _id: "1" } as any;
    jest.spyOn(service, "markPaid").mockResolvedValue(item);

    const res = await request.patch("/rest/payroll/1/paid").expect(200);

    expect(service.markPaid).toHaveBeenCalledWith("1");
    expect(res.body).toEqual({ success: true, data: item });
  });
});
