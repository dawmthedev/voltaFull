import { PlatformTest } from "@tsed/common";
import SuperTest from "supertest";
import { Server } from "../../server/src/Server";
import { AdminService } from "../../server/src/services/AdminService";
import { VerificationService } from "../../server/src/services/VerificationService";
import { OrganizationService } from "../../server/src/services/OrganizationService";
import { createPasswordHash } from "../../server/src/util";

describe("Authentication integration", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;
  let adminService: AdminService;
  let verificationService: VerificationService;
  let organizationService: OrganizationService;

  beforeAll(() => {
    process.env.ENCRYPTION_KEY = "test-key";
  });

  beforeEach(PlatformTest.bootstrap(Server));
  beforeEach(() => {
    request = SuperTest(PlatformTest.callback());
    adminService = PlatformTest.injector.get(AdminService)!;
    verificationService = PlatformTest.injector.get(VerificationService)!;
    organizationService = PlatformTest.injector.get(OrganizationService)!;
  });

  afterEach(PlatformTest.reset);

  describe("POST /auth/login", () => {
    it("returns 200 and success payload on valid credentials", async () => {
      const email = "john@example.com";
      const password = "secret";
      const admin = {
        _id: "1",
        name: "John",
        email,
        role: "",
        docs: "",
        recordID: "r1",
        unlocked: "",
        twoFactorEnabled: false,
        orgId: "org",
        password: createPasswordHash({ email, password }),
        isSuperAdmin: false
      } as any;

      jest.spyOn(adminService, "findAdminByEmail").mockResolvedValue(admin);
      jest.spyOn(adminService, "createSessionCookie").mockResolvedValue("token123");

      const res = await request
        .post("/rest/auth/login")
        .send({ email, password })
        .expect(200);

      expect(res.body).toEqual({
        success: true,
        data: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          docs: admin.docs,
          recordID: admin.recordID,
          unlocked: admin.unlocked,
          twoFactorEnabled: admin.twoFactorEnabled,
          orgId: admin.orgId,
          company: "crm",
          token: "token123",
          isSuperAdmin: admin.isSuperAdmin
        }
      });
    });

    it("returns 404 when admin is not found", async () => {
      jest.spyOn(adminService, "findAdminByEmail").mockResolvedValue(null as any);

      const res = await request
        .post("/rest/auth/login")
        .send({ email: "unknown@example.com", password: "test" })
        .expect(404);

      expect(res.body).toMatchObject({
        status: 404,
        name: "NOT_FOUND",
        message: "EMAIL_NOT_EXISTS"
      });
    });
  });

  describe("POST /auth/verify", () => {
    it("returns 200 when code is valid", async () => {
      jest
        .spyOn(verificationService, "verifyCodeByEmail")
        .mockResolvedValue({} as any);

      const res = await request
        .post("/rest/auth/verify")
        .send({ email: "john@example.com", code: "123456" })
        .expect(200);

      expect(res.body).toEqual({
        success: true,
        data: { success: true, message: "Verification Code verified successfully" }
      });
    });
  });

  describe("POST /auth/register", () => {
    it("registers admin when data is valid", async () => {
      jest
        .spyOn(organizationService, "findOrganization")
        .mockResolvedValue(null as any);
      jest
        .spyOn(organizationService, "createOrganization")
        .mockResolvedValue({ _id: "org1" } as any);
      jest.spyOn(adminService, "findAdminByEmail").mockResolvedValue(null as any);
      jest
        .spyOn(adminService, "createAdmin")
        .mockResolvedValue({} as any);

      const res = await request
        .post("/rest/auth/register")
        .send({ name: "John", email: "john@example.com", password: "secret" })
        .expect(200);

      expect(organizationService.createOrganization).toHaveBeenCalled();
      expect(adminService.createAdmin).toHaveBeenCalledWith(
        expect.objectContaining({
          email: "john@example.com",
          name: "John",
          password: "secret",
          role: "admin",
          organizationId: "org1"
        })
      );
      expect(res.body).toEqual({
        success: true,
        data: { success: true, message: "Admin registered successfully" }
      });
    });

    it("returns error when admin exists", async () => {
      jest
        .spyOn(organizationService, "findOrganization")
        .mockResolvedValue({ _id: "org1" } as any);
      jest
        .spyOn(adminService, "findAdminByEmail")
        .mockResolvedValue({} as any);

      const res = await request
        .post("/rest/auth/register")
        .send({ name: "John", email: "john@example.com", password: "secret" })
        .expect(500);

      expect(res.body.message).toBe("ADMIN_ALREADY_EXISTS");
    });
  });
});
