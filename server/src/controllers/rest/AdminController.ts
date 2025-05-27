import { Controller, Inject } from "@tsed/di";
import { BadRequest, Unauthorized } from "@tsed/exceptions";
import { BodyParams, Context } from "@tsed/platform-params";
import { Enum, Get, Post, Property, Put, Required, Returns } from "@tsed/schema";
import { AdminResultModel, AdminRoleModel, SaleRefResultModel, SuccessMessageModel } from "../../models/RestModels";
import { AdminService } from "../../services/AdminService";
import { NodemailerClient } from "../../clients/nodemailer";
import { SuccessArrayResult, SuccessResult } from "../../util/entities";
import { ADMIN } from "../../util/constants";
import { EMAIL_EXISTS } from "../../util/errors";
import { RoleEnum } from "../../../types";
import { SaleRepService } from "../../services/SaleRepService";

class UpdateAdminParams {
  @Required() public readonly id: string;
  @Property() @Enum(RoleEnum) public readonly role: RoleEnum | undefined;
  @Property() public readonly name: string;
  @Property() public readonly docs: string;
  @Property() public readonly isSuperAdmin: boolean;
}

class InviteUserDto {
  @Required() public readonly name: string;
  @Required() public readonly email: string;
  @Required() public readonly role: string;
  @Property() public readonly phone?: string;
}
// Expose user management under /users
@Controller("/users")
export class AdminController {
  @Inject() private adminService: AdminService;
  @Inject() private saleRepService: SaleRepService;

  @Get()
  @(Returns(200, SuccessArrayResult).Of(AdminResultModel))
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
  @(Returns(200, SuccessResult).Of(AdminResultModel))
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
  @(Returns(200, SuccessResult).Of(SaleRefResultModel))
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

  @Post("/invite")
  @(Returns(200, SuccessResult).Of(SuccessMessageModel))
  public async inviteUser(@BodyParams() body: InviteUserDto, @Context() context: Context) {
    await this.adminService.checkPermissions({ hasRole: [ADMIN] }, context.get("user"));
    const { name, email, role, phone } = body;
    const exists = await this.adminService.findAdminByEmail(email);
    if (exists) throw new BadRequest(EMAIL_EXISTS);
    await this.adminService.inviteUser({ name, email, role, phone });
    await NodemailerClient.sendInviteEmail({
      email,
      name,
      role,
      link: `https://volta-crm.com/register?email=${encodeURIComponent(email)}&role=${encodeURIComponent(role)}`
    });
    return new SuccessResult({ success: true, message: "Invite sent" }, SuccessMessageModel);
  }

  @Get("/me")
  @(Returns(200, SuccessResult).Of(AdminResultModel))
  public async getMe(@Context() context: Context) {
    const admin = context.get("user");
    if (!admin) throw new Unauthorized(ADMIN_NOT_FOUND);
    return new SuccessResult(
      {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role || "",
        docs: admin.docs || "",
        recordID: admin.recordID || "",
        unlocked: admin.unlocked || "",
        twoFactorEnabled: admin.twoFactorEnabled,
        orgId: admin.orgId || "",
        company: admin.company,
        isSuperAdmin: admin.isSuperAdmin
      },
      AdminResultModel
    );
  }
}
