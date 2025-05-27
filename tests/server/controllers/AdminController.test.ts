import { PlatformTest } from "@tsed/common";
import SuperTest from "supertest";
import { Server } from "../../server/src/Server";

describe("AdminController /users/me", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeEach(PlatformTest.bootstrap(Server));
  beforeEach(() => {
    request = SuperTest(PlatformTest.callback());
  });

  afterEach(PlatformTest.reset);

  it("returns 401 when not authenticated", async () => {
    const res = await request.get("/rest/users/me").expect(401);
    expect(res.body.status).toBe(401);
  });

  it("GET /api/users/check-email returns status", async () => {
    const res = await request
      .get("/api/users/check-email")
      .query({ email: "new@test.com" })
      .expect(200);
    expect(res.body).toEqual({ exists: false, invited: false });
  });
});
