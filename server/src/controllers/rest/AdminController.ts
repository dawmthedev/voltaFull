import { Controller, Inject } from "@tsed/di";
import { BadRequest, Unauthorized } from "@tsed/exceptions";
import { BodyParams, Context, QueryParams } from "@tsed/platform-params";
import { Enum, Get, Post, Property, Put, Required, Returns } from "@tsed/schema";
import { AdminResultModel, AdminRoleModel, SaleRefResultModel, SuccessMessageModel } from "../../models/RestModels";
import { AdminService } from "../../services/AdminService";
import { NodemailerClient } from "../../clients/nodemailer";
import { SuccessResult } from "../../util/entities";
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
    const status = await this.adminService.checkEmail(email);
    if (status.exists) throw new BadRequest(EMAIL_EXISTS);
    await this.adminService.inviteUser({ name, email, role, phone, sender: context.get("user").email });
    await NodemailerClient.sendInviteEmail({
      email,
      name,
      role,
      link: `https://volta-crm.com/register?email=${encodeURIComponent(email)}&role=${encodeURIComponent(role)}`
    });
    return new SuccessResult({ success: true, message: "Invite sent" }, SuccessMessageModel);
  }

  @Get("/check-email")
  public async checkEmail(@QueryParams("email") email: string) {
    return await this.adminService.checkEmail(email);
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
