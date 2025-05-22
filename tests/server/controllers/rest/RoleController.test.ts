import { BadRequest } from "@tsed/exceptions";
import { RoleController } from "../../../../server/src/controllers/rest/RoleController";
import { RoleService } from "../../../../server/src/services/RoleService";
import { AdminService } from "../../../../server/src/services/AdminService";
import { ROLE_EXISTS } from "../../../../server/src/util/errors";
import { SuccessArrayResult, SuccessResult } from "../../../../server/src/util/entities";

describe("RoleController", () => {
  let controller: RoleController;
  let roleService: jest.Mocked<RoleService>;
  let adminService: jest.Mocked<AdminService>;
  let context: any;

  beforeEach(() => {
    roleService = {
      findRoles: jest.fn(),
      findRoleById: jest.fn(),
      createRole: jest.fn(),
      updateRole: jest.fn(),
      findRole: jest.fn()
    } as unknown as jest.Mocked<RoleService>;

    adminService = {
      checkPermissions: jest.fn()
    } as unknown as jest.Mocked<AdminService>;

    controller = new RoleController();
    (controller as any).roleService = roleService;
    (controller as any).adminService = adminService;

    context = {
      get: jest.fn().mockReturnValue({ id: "admin" })
    };
  });

  describe("getRoles", () => {
    it("returns roles after permission check", async () => {
      roleService.findRoles.mockResolvedValue([{ _doc: { _id: "1", name: "test" } } as any]);

      const result = await controller.getRoles(context);

      expect(adminService.checkPermissions).toHaveBeenCalledWith({ hasRole: ["CRM System Administrator", "manager"] }, { id: "admin" });
      expect(roleService.findRoles).toHaveBeenCalled();
      expect(result).toBeInstanceOf(SuccessArrayResult);
      expect((result as SuccessArrayResult<any>).data).toEqual([{ _id: "1", name: "test" }]);
    });

    it("propagates errors from service", async () => {
      roleService.findRoles.mockRejectedValue(new Error("fail"));

      await expect(controller.getRoles(context)).rejects.toThrow("fail");
    });
  });

  describe("createRole", () => {
    it("creates role when not existing", async () => {
      roleService.findRoleById.mockResolvedValue(null);
      roleService.createRole.mockResolvedValue({ _id: "1", name: "new" } as any);

      const result = await controller.createRole({ name: "new" } as any, context);

      expect(adminService.checkPermissions).toHaveBeenCalledWith({ hasRole: ["CRM System Administrator"] }, { id: "admin" });
      expect(roleService.findRoleById).toHaveBeenCalledWith("new");
      expect(roleService.createRole).toHaveBeenCalledWith({ name: "new" });
      expect(result).toBeInstanceOf(SuccessResult);
      expect((result as SuccessResult<any>).data).toEqual({ _id: "1", name: "new" });
    });

    it("throws BadRequest when role exists", async () => {
      roleService.findRoleById.mockResolvedValue({});

      await expect(controller.createRole({ name: "exists" } as any, context)).rejects.toEqual(new BadRequest(ROLE_EXISTS));
    });

    it("propagates errors from service", async () => {
      roleService.findRoleById.mockResolvedValue(null);
      roleService.createRole.mockRejectedValue(new Error("creation fail"));

      await expect(controller.createRole({ name: "bad" } as any, context)).rejects.toThrow("creation fail");
    });
  });
});
