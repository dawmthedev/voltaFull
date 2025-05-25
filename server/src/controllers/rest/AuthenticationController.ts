import { BodyParams, Req, Res, Response, MultipartFile } from "@tsed/common";
import { Controller, Inject } from "@tsed/di";
import { BadRequest, Forbidden, NotFound, Unauthorized } from "@tsed/exceptions";
import { Enum, Post, Property, Required, Returns, Put, Get, Description, Summary } from "@tsed/schema";
import { ADMIN_NOT_FOUND, EMAIL_EXISTS, EMAIL_NOT_EXISTS, INCORRECT_PASSWORD, INVALID_TOKEN, MISSING_PARAMS } from "../../util/errors";
import {
  SuccessMessageModel,
  VerificationSuccessModel,
  IsVerificationTokenCompleteModel,
  AdminResultModel,
  AIResponseModel,
  CrmDealResultModel,
  CrmRateResultModel,
  SingleCrmDealResultModel,
  CrmPayrollResultModel,
  NewSaleResultModel,
  UtilityBillResultModel,
  CrmTimelineResultModel,
  CrmTimelineAvgResultModel,
  FuturePayResultModel,
  PreviousPayResultModel
} from "../../models/RestModels";

import { OpenAIService } from "../../helper/OpenAIService";
import { SuccessResult } from "../../util/entities";
import { VerificationService } from "../../services/VerificationService";
import { AdminService } from "../../services/AdminService";
import { NodemailerClient } from "../../clients/nodemailer";
import { ADMIN_ALREADY_EXISTS, ORGANIZATION_NAME_ALREADY_EXISTS } from "../../util/errors";
import { OrganizationService } from "../../services/OrganizationService";
import { createPasswordHash } from "../../util";
import { VerificationEnum } from "../../../types";
import axios from "axios";
import logger from "../../util/logger";

type MulterFile = Express.Multer.File;
// Then use MulterFile where you previously used Express.Multer.File
// Define a local interface for the file, minimal based on what Multer provides

export class StartVerificationParams {
  @Required() public readonly email: string;
  @Required() @Enum(VerificationEnum) public readonly type: VerificationEnum | undefined;
}

class UpdateAdminPasswordParams {
  @Required() public readonly code: string;
  @Required() public readonly password: string;
}

class CompleteRegistration {
  @Required() public readonly name: string;
  @Required() public readonly email: string;
  @Required() public readonly password: string;
}

class ForgetAdminPasswordParams {
  @Required() public readonly email: string;
  @Required() public readonly password: string;
  @Required() public readonly code: string;
}

class AdminLoginBody {
  @Required() public readonly email: string;
  @Required() public readonly password: string;
}

class RegisterOrgParams {
  @Property() public readonly company: string;
  @Required() public readonly email: string;
  @Property() public readonly role: string;
  @Property() public readonly name: string;
  @Property() public readonly password: string;
  @Property() public readonly verificationToken: string;
}

class CrmDealsBody {
  @Required() public readonly recordId: string;
}

class CrmRateBody {}

export class SingleCrmDealResultCollection {
  @Property() public deals: SingleCrmDealResultModel[];
}

export class CrmRatesResultCollection {
  @Property() public rates: CrmRateResultModel[];
}

export class Avgtimeline {
  @Property() public timeline: CrmTimelineAvgResultModel;
}

export class AhjTimeline {
  @Property() public timeline: CrmTimelineResultModel[];
}

class AIResponseCollection {
  @Property() public responses: AIResponseModel[];
}

export class PreviousPayCollection {
  @Property() public deals: PreviousPayResultModel[];
}

export class UpcomginPayCollection {
  @Property() public deals: FuturePayResultModel[];
}
export class CrmDealResultCollection {
  @Property() public deals: CrmDealResultModel[];
}

class CrmPayBody {
  @Required() public readonly recordId: string;
}

class timelineBody {
  @Required() public readonly repId: string;
}
export class CrmPayrollResultCollection {
  @Property(CrmPayrollResultModel)
  public readonly payrollData: CrmPayrollResultModel[];
}

export class NewSaleResultCollection {
  @Property(NewSaleResultModel)
  public readonly newSaleData: NewSaleResultModel[];
}

const isSecure = process.env.NODE_ENV === "production";
const QUICKBASE_API_BASE_URL = process.env.QUICKBASE_API_BASE_URL || "";
const OPENAI_COMPLETION_URL = process.env.OPENAI_COMPLETION_URL || "";
@Controller("/auth")
export class AuthenticationController {
  @Inject()
  private verificationService: VerificationService;
  @Inject()
  private adminService: AdminService;
  @Inject()
  private organizationService: OrganizationService;

  @Post("/start-verification")
  @(Returns(200, SuccessResult).Of(SuccessMessageModel))
  public async startVerification(@BodyParams() body: StartVerificationParams) {
    const { email, type } = body;
    logger.request("Starting verification", { email, type });
    if (!email || !type) throw new BadRequest(MISSING_PARAMS);
    const findAdmin = await this.adminService.findAdminByEmail(email);
    if (type === VerificationEnum.PASSWORD && !findAdmin) throw new BadRequest(EMAIL_NOT_EXISTS);
    const verificationData = await this.verificationService.generateVerification({ email, type });

    const maskedCode = verificationData.code ? `${verificationData.code.substring(0, 2)}***` : "";
    logger.request("Generated verification code", { code: maskedCode });

    try {
      await NodemailerClient.sendVerificationEmail({
        title: type || "Email",
        email,
        code: verificationData.code
      });
      logger.request("Verification email sent");
    } catch (error) {
      logger.error("Failed to send verification email", error);
      throw error;
    }
    return new SuccessResult({ success: true, message: "Verification Code sent successfully!" }, SuccessMessageModel);
  }

  @Post("/verify")
  @(Returns(200, SuccessResult).Of(SuccessMessageModel))
  public async verifyCode(@BodyParams() body: { code: string; email: string }) {
    const { code, email } = body;
    if (!code || !email) throw new BadRequest(MISSING_PARAMS);
    await this.verificationService.verifyCodeByEmail({ code, email });
    return new SuccessResult({ success: true, message: "Verification Code verified successfully" }, SuccessMessageModel);
  }

  @Post("/register")
  @(Returns(200, SuccessResult).Of(SuccessMessageModel))
  public async newOrg(@BodyParams() body: RegisterOrgParams) {
    let { email, name, password } = body;
    let organization = await this.organizationService.findOrganization();
    if (!organization) {
      organization = await this.organizationService.createOrganization({ name: "Voltaic LLC", email });
    }
    const admin = await this.adminService.findAdminByEmail(email);
    if (admin) throw new Error(ADMIN_ALREADY_EXISTS);
    await this.adminService.createAdmin({
      email: email,
      name: name || "",
      role: body.role || "admin",
      password: password,
      organizationId: organization?._id || ""
    });
    return new SuccessResult({ success: true, message: "Admin registered successfully" }, SuccessMessageModel);
  }

  @Post("/complete-registration")
  @(Returns(200, SuccessResult).Of(SuccessMessageModel))
  public async completeRegistration(@BodyParams() body: CompleteRegistration) {
    const { name, email, password } = body;
    if (!email || !password) throw new BadRequest(MISSING_PARAMS);
    const admin = await this.adminService.findAdminByEmail(email);
    if (!admin) throw new NotFound(ADMIN_NOT_FOUND);
    await this.adminService.completeAdminRegistration({ id: admin.id, name, email, password });
    return new SuccessResult({ success: true, message: "Admin registration successfully completed" }, SuccessMessageModel);
  }
  @Post("/login")
  @(Returns(200, SuccessResult).Of(AdminResultModel))
  public async adminLogin(@BodyParams() body: AdminLoginBody, @Response() res: Response) {
    const { email, password } = body;

    logger.request("Testing Login...");
    logger.request("Received login request for email:", email); // Be careful with logging sensitive information -> Check if admin email is here

    if (!email || !password) throw new BadRequest(MISSING_PARAMS);
    const admin = await this.adminService.findAdminByEmail(email);
    if (!admin) throw new NotFound(EMAIL_NOT_EXISTS);
    if (admin.password !== createPasswordHash({ email, password })) throw new Forbidden(INCORRECT_PASSWORD);
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const options = { maxAge: expiresIn, httpOnly: true, secure: isSecure };
    const sessionCookie = await this.adminService.createSessionCookie(admin);
    // res.cookie("session", sessionCookie, options);
    return new SuccessResult(
      {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role || "",
        docs: admin.docs || "",
        recordID: admin.recordID || "",
        unlocked: admin.unlocked || "",
        twoFactorEnabled: admin.twoFactorEnabled,
        orgId: admin.orgId || "",
        company: "crm",
        token: sessionCookie,
        isSuperAdmin: admin.isSuperAdmin
      },
      AdminResultModel
    );
  }
}
