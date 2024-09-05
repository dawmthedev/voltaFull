import { Controller, Inject } from "@tsed/di";
import { BadRequest, Unauthorized } from "@tsed/exceptions";
import { BodyParams, Context } from "@tsed/platform-params";
import { Enum, Get, Post, Property, Put, Required, Returns } from "@tsed/schema";
import { ADMIN_NOT_FOUND, ORG_NOT_FOUND } from "../../util/errors";
import { AdminResultModel, AdminRoleModel, IdModel, SaleRefResultModel, SuccessMessageModel } from "../../models/RestModels";
import { AdminService } from "../../services/AdminService";
import { SuccessArrayResult, SuccessResult } from "../../util/entities";
import { ADMIN } from "../../util/constants";
import { RoleEnum } from "../../../types";
import { SaleRepService } from "../../services/SaleRepService";

class UpdateAdminParams {
  @Required() public readonly id: string;
  @Property() @Enum(RoleEnum) public readonly role: RoleEnum | undefined;
  @Property() public readonly name: string;
  @Property() public readonly docs: string;
  @Property() public readonly isSuperAdmin: boolean;
}
@Controller("/admin")
export class AdminController {
  @Inject() private adminService: AdminService;
  @Inject() private saleRepService: SaleRepService;

  @Get()
  @Returns(200, SuccessArrayResult).Of(AdminResultModel)
  public async getAllUsers(@BodyParams() body: { orgId: string }, @Context() context: Context) {
    await this.adminService.checkPermissions({ hasRole: [ADMIN] }, context.get("user"));
    const admins = await this.adminService.findAdmins();
    const response = {
      admins: admins.map((admin) => {
        return {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role || "",
          docs: admin.docs || "",
          unlocked: admin.unlocked || "",
          twoFactorEnabled: admin.twoFactorEnabled,
          orgId: admin.orgId || "",
          company: "Voltaic LLC",
          isSuperAdmin: admin.isSuperAdmin
        };
      })
    };
    return new SuccessArrayResult(response.admins, AdminResultModel);
  }

  @Put()
  @Returns(200, SuccessResult).Of(AdminResultModel)
  public async updateAdmin(@BodyParams() body: UpdateAdminParams, @Context() context: Context) {
    await this.adminService.checkPermissions({ hasRole: [ADMIN] }, context.get("user"));
    const admin = await this.adminService.updateAdmin({ ...body });
    return new SuccessResult(
      {
        id: admin?._id,
        email: admin?.email,
        role: admin?.role
      },
      AdminRoleModel
    );
  }

  @Post("/create/sale-rep")
  @Returns(200, SuccessResult).Of(SaleRefResultModel)
  public async createSaleRep(@BodyParams() { _adminId }: { _adminId: string }, @Context() context: Context) {
    const { adminId } = await this.adminService.checkPermissions({ hasRole: [ADMIN] }, context.get("user"));
    if (!adminId) throw new Unauthorized(ADMIN_NOT_FOUND);
    const saleRep = await this.saleRepService.createSaleRep({ adminId: _adminId });
    return new SuccessResult(
      {
        success: true,
        message: `Sale Rep created successfully ${saleRep}`
      },
      SuccessMessageModel
    );
  }
}
