import { PlatformTest } from "@tsed/common";
import SuperTest from "supertest";
import { Server } from "../../server/src/Server";
import { UserService } from "../../server/src/services/UserService";

describe("UsersController", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;
  let userService: UserService;

  beforeEach(PlatformTest.bootstrap(Server));
  beforeEach(() => {
    request = SuperTest(PlatformTest.callback());
    userService = PlatformTest.injector.get(UserService)!;
  });

  afterEach(PlatformTest.reset);

  it("GET /users returns users", async () => {
    const users = [{ _id: "1", name: "Alice" }] as any;
    jest.spyOn(userService, "findAll").mockResolvedValue(users);

    const res = await request.get("/rest/users").expect(200);

    expect(res.body).toEqual({ success: true, data: users });
  });
});
