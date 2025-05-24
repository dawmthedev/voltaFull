import { PlatformTest } from "@tsed/common";
import SuperTest from "supertest";
import { Server } from "../../server/src/Server";

describe("AdminController /admin/me", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeEach(PlatformTest.bootstrap(Server));
  beforeEach(() => {
    request = SuperTest(PlatformTest.callback());
  });

  afterEach(PlatformTest.reset);

  it("returns 401 when not authenticated", async () => {
    const res = await request.get("/rest/admin/me").expect(401);
    expect(res.body.status).toBe(401);
  });
});
