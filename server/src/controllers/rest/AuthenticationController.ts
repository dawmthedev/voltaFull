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

import { openAIService } from "../../helper/OpenAIService";
import { SuccessResult } from "../../util/entities";
import { VerificationService } from "../../services/VerificationService";
import { AdminService } from "../../services/AdminService";
import { NodemailerClient } from "../../clients/nodemailer";
import { ADMIN_ALREADY_EXISTS, ORGANIZATION_NAME_ALREADY_EXISTS } from "../../util/errors";
import { OrganizationService } from "../../services/OrganizationService";
import { createPasswordHash } from "../../util";
import { VerificationEnum } from "../../../types";
import axios from "axios";
import { $log } from "@tsed/logger";

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
@Controller("/auth")
export class AuthenticationController {
  @Inject()
  private verificationService: VerificationService;
  @Inject()
  private adminService: AdminService;
  @Inject()
  private organizationService: OrganizationService;

  @Post("/start-verification")
  @Returns(200, SuccessResult).Of(SuccessMessageModel)
  public async startVerification(@BodyParams() body: StartVerificationParams) {
    const { email, type } = body;
    $log.info("Starting verification", { email, type });
    if (!email || !type) throw new BadRequest(MISSING_PARAMS);
    const findAdmin = await this.adminService.findAdminByEmail(email);
    if (type === VerificationEnum.PASSWORD && !findAdmin) throw new BadRequest(EMAIL_NOT_EXISTS);
    const verificationData = await this.verificationService.generateVerification({ email, type });
    const maskedCode = verificationData.code
      ? `${verificationData.code.substring(0, 2)}***`
      : "";
    $log.info("Generated verification code", { code: maskedCode });
    try {
      await NodemailerClient.sendVerificationEmail({
        title: type || "Email",
        email,
        code: verificationData.code
      });
      $log.info("Verification email sent");
    } catch (error) {
      $log.error("Failed to send verification email", error);
      throw error;
    }
    return new SuccessResult({ success: true, message: "Verification Code sent successfully!" }, SuccessMessageModel);
  }

  @Post("/verify")
  @Returns(200, SuccessResult).Of(SuccessMessageModel)
  public async verifyCode(@BodyParams() body: { code: string; email: string }) {
    const { code, email } = body;
    if (!code || !email) throw new BadRequest(MISSING_PARAMS);
    await this.verificationService.verifyCodeByEmail({ code, email });
    return new SuccessResult({ success: true, message: "Verification Code verified successfully" }, SuccessMessageModel);
  }

  @Post("/register")
  @Returns(200, SuccessResult).Of(SuccessMessageModel)
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
  @Returns(200, SuccessResult).Of(SuccessMessageModel)
  public async completeRegistration(@BodyParams() body: CompleteRegistration) {
    const { name, email, password } = body;
    if (!email || !password) throw new BadRequest(MISSING_PARAMS);
    const admin = await this.adminService.findAdminByEmail(email);
    if (!admin) throw new NotFound(ADMIN_NOT_FOUND);
    await this.adminService.completeAdminRegistration({ id: admin.id, name, email, password });
    return new SuccessResult({ success: true, message: "Admin registration successfully completed" }, SuccessMessageModel);
  }
  @Post("/login")
  @Returns(200, SuccessResult).Of(AdminResultModel)
  public async adminLogin(@BodyParams() body: AdminLoginBody, @Response() res: Response) {
    const { email, password } = body;

    console.log("Testing Login...");
    console.log("Received login request for email:", email); // Be careful with logging sensitive information

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

  //added
  //added/

  @Post("/crmNewSales")
  @Returns(200, SuccessResult).Of(NewSaleResultModel)
  public async crmNewSales(@BodyParams() body: CrmPayBody, @Response() res: Response) {
    console.log("crm payroll-----------------------------------------");
    const { recordId } = body;
    CrmPayBody;
    if (!recordId) throw new BadRequest(MISSING_PARAMS);

    const API_URL = "https://voltaicqbapi.herokuapp.com/NewSales";

    const requestBody = {
      repID: recordId
    };

    const headers = {
      "Content-Type": "application/json"
    };

    console.log("Getting CRM Payroll...");
    console.log(recordId);

    const response = await axios.post(API_URL, requestBody, { headers });
    console.log("response--------", response);
    if (!response || !response.data) throw new BadRequest("Invalid response from Quickbase API");
    const data = response.data;
    const dataArray = Array.isArray(data) ? data : [data];

    // const payrollResults = dataArray.map((record) => ({
    //   lead: record["lead"] ? record["lead"].replace(/"/g, '') : null,
    //   userStatus: record["userStatus"] ? record["userStatus"].replace(/"/g, '') : null,
    //   salesRep: record["salesRep"] ? record["salesRep"].replace(/"/g, '') : null,
    //   ppwFinal: record["ppwFinal"] ?  record["ppwFinal"]  : null,
    //   status: record["systemSizeFinal"] ? record["systemSizeFinal"]  : null,
    //   milestone: record["milestone"] ? record["milestone"].replace(/"/g, '') : null,
    //   datePaid: record["datePaid"] ? record["datePaid"].replace(/"/g, '') : null,
    //   amount: record["amount"] ? record["amount"] : null,
    //   // Add other properties here as needed
    // }));

    const NewSaleResults = dataArray.map((record) => ({
      installer: record["installer"] ? record["installer"].replace(/"/g, "") : null,
      atticImage: record["atticImage"] ? record["atticImage"].replace(/"/g, "") : null,
      utilityImage1: record["utilityImage1"] ? record["utilityImage1"].replace(/"/g, "") : null,
      licenseimage: record["licenseimage"] ? record["licenseimage"].replace(/"/g, "") : null,
      depositImage: record["depositImage"] ? record["depositImage"].replace(/"/g, "") : null,
      program: record["program"] ? record["program"].replace(/"/g, "") : null,
      notes: record["notes"] ? record["notes"].replace(/"/g, "") : null,
      recordID: record["recordID"] ? record["recordID"].replace(/"/g, "") : null,
      leadGen: record["leadGen"] ? record["leadGen"].replace(/"/g, "") : null,
      utilityImage2: record["utilityImage2"] ? record["utilityImage2"].replace(/"/g, "") : null,
      utilityImage3: record["utilityImage3"] ? record["utilityImage3"].replace(/"/g, "") : null,
      utilityImage4: record["utilityImage4"] ? record["utilityImage4"].replace(/"/g, "") : null,
      utilityImage5: record["utilityImage5"] ? record["utilityImage5"].replace(/"/g, "") : null,
      utilityImage6: record["utilityImage6"] ? record["utilityImage6"].replace(/"/g, "") : null,
      utilityImage7: record["utilityImage7"] ? record["utilityImage7"].replace(/"/g, "") : null,
      atticImage2: record["atticImage2"] ? record["atticImage2"].replace(/"/g, "") : null,
      design: record["design"] ? record["design"].replace(/"/g, "") : null,
      designNotes: record["designNotes"] ? record["designNotes"].replace(/"/g, "") : null,
      mpuNotes: record["mpuNotes"] ? record["mpuNotes"].replace(/"/g, "") : null,
      mpu: record["mpu"] ? record["mpu"].replace(/"/g, "") : null,
      adders: record["adders"] ? record["adders"].replace(/"/g, "") : null,
      salesRep: record["salesRep"] ? record["salesRep"].replace(/"/g, "") : null,
      batteryQuantity: record["batteryQuantity"] ? record["batteryQuantity"].replace(/"/g, "") : null,
      batteryPlacementNotes: record["batteryPlacementNotes"] ? record["batteryPlacementNotes"].replace(/"/g, "") : null,
      ownerName: record["ownerName"] ? record["ownerName"].replace(/"/g, "") : null,
      inverter: record["inverter"] ? record["inverter"].replace(/"/g, "") : null,
      batteries: record["batteries"] ? record["batteries"].replace(/"/g, "") : null,
      batteryMode: record["batteryMode"] ? record["batteryMode"].replace(/"/g, "") : null,
      batteryPlacement: record["batteryPlacement"] ? record["batteryPlacement"].replace(/"/g, "") : null
    }));

    console.log("Returning CRM payroll data...");

    return new SuccessResult({ newSaleData: NewSaleResults }, NewSaleResultCollection);
  }

  @Post("/uploadUtilityBill")
  @Summary("Upload and analyze utility bill")
  @Description("This route allows uploading a utility bill for analysis.")
  async uploadUtilityBill(@MultipartFile("file") file: MulterFile): Promise<string> {
    if (!file) {
      throw new BadRequest("No file uploaded");
    }

    try {
      return await this.analyzeWithOpenAI(file.buffer);
    } catch (error) {
      throw new BadRequest("Error processing utility bill with OpenAI: " + error.message);
    }
  }

  private async analyzeWithOpenAI(buffer: Buffer): Promise<string> {
    const maxRetries = 3;
    let attempt = 0;
    const retryDelay = 1000; // 1 second

    const base64Image = buffer.toString("base64");
    const apiUrl = "https://api.openai.com/v1/chat/completions";
    const payload = {
      model: "gpt-4-turbo",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "What’s in this image?"
            },
            {
              type: "image_base64",
              image_base64: base64Image
            }
          ]
        }
      ],
      max_tokens: 300
    };

    console.log("Sending Request to OpenAI:", { apiUrl, payload }); // Log request details

    while (attempt < maxRetries) {
      try {
        const response = await axios.post(apiUrl, payload, {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json"
          }
        });

        console.log("Received Response from OpenAI:", response.data); // Log response details

        if (response.data.choices && response.data.choices.length > 0) {
          return response.data.choices[0].text.trim();
        } else {
          throw new Error("No valid response from OpenAI");
        }
      } catch (error) {
        console.error("Error in OpenAI API call:", error.response ? error.response.data : error.message);
        if (error.response && error.response.status === 429) {
          // If rate-limited, wait and retry
          attempt++;
          console.log(`Rate limited. Retrying attempt ${attempt} in ${retryDelay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        } else {
          // If a different error, throw it
          throw error;
        }

        throw new Error(`Failed to process utility bill with OpenAI: ${error.message}`);
      }
    }

    throw new Error("Failed to process utility bill with OpenAI: Rate limit exceeded");
  }

  //   private async analyzeWithOpenAI(fileBuffer: Buffer): Promise<string> {
  //     const base64Image = fileBuffer.toString('base64'); // Ensure the image is fully captured in base64 format
  //     try {
  //         const apiUrl = 'https://api.openai.com/v1/chat/completions';
  //         const payload = {
  //             model: "gpt-4-turbo", // Confirm the model name, e.g., use an appropriate model that can process image data.
  //             messages: [
  //               {
  //                 "role": "user",
  //                 "content": [
  //                   {
  //                     "type": "text",
  //                     "text": "What’s in this image?"
  //                   },
  //                   {
  //                     "type": "image_url",
  //                     "image_url": {
  //                       "url": `data:image/jpeg;base64,${base64Image}`
  //                     }
  //                   }
  //                 ]
  //               }
  //             ],
  //             max_tokens: 300
  //         };

  //         const response = await axios.post(apiUrl, payload, {
  //             headers: {
  //                 Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  //                 'Content-Type': 'application/json'
  //             }
  //         });

  //         console.log("OpenAI Response:", response.data);

  //         if (response.data.choices && response.data.choices.length > 0) {
  //             return response.data.choices[0].text.trim();
  //         } else {
  //             throw new Error('No valid response from OpenAI');
  //         }
  //     } catch (error) {
  //         console.error('Error in OpenAI API call:', error);
  //         throw new Error(`Failed to process utility bill with OpenAI: ${error.message}`);
  //     }
  // }

  @Post("/crmPayroll")
  @Returns(200, SuccessResult).Of(CrmPayrollResultModel)
  public async crmPayroll(@BodyParams() body: CrmPayBody, @Response() res: Response) {
    console.log("crm payroll-----------------------------------------");
    const { recordId } = body;
    CrmPayBody;
    if (!recordId) throw new BadRequest(MISSING_PARAMS);

    const API_URL = "https://voltaicqbapi.herokuapp.com/CRMPayroll";

    const requestBody = {
      repID: recordId
    };

    const headers = {
      "Content-Type": "application/json"
    };

    console.log("Getting CRM Payroll...");
    console.log(recordId);

    const response = await axios.post(API_URL, requestBody, { headers });
    console.log("response--------", response);
    if (!response || !response.data) throw new BadRequest("Invalid response from Quickbase API");
    const data = response.data;
    const dataArray = Array.isArray(data) ? data : [data];

    // const payrollResults = dataArray.map((record) => ({
    //   lead: record["lead"] ? record["lead"].replace(/"/g, '') : null,
    //   userStatus: record["userStatus"] ? record["userStatus"].replace(/"/g, '') : null,
    //   salesRep: record["salesRep"] ? record["salesRep"].replace(/"/g, '') : null,
    //   ppwFinal: record["ppwFinal"] ?  record["ppwFinal"]  : null,
    //   status: record["systemSizeFinal"] ? record["systemSizeFinal"]  : null,
    //   milestone: record["milestone"] ? record["milestone"].replace(/"/g, '') : null,
    //   datePaid: record["datePaid"] ? record["datePaid"].replace(/"/g, '') : null,
    //   amount: record["amount"] ? record["amount"] : null,
    //   // Add other properties here as needed
    // }));

    const payrollResults = dataArray.map((record) => ({
      lead: record["lead"] ? record["lead"].replace(/"/g, "") : null,
      userStatus: record["userStatus"] ? record["userStatus"].replace(/"/g, "") : null,
      itemType: record["itemType"] ? record["itemType"].replace(/"/g, "") : null,
      saleDate: record["saleDate"] ? record["saleDate"].replace(/"/g, "") : null,
      relatedContractAmount: record["relatedContractAmount"] ? record["relatedContractAmount"].replace(/"/g, "") : null,
      relatedDealerFee: record["relatedDealerFee"] ? record["relatedDealerFee"].replace(/"/g, "") : null,
      addersFinal: record["addersFinal"] ? record["addersFinal"].replace(/"/g, "") : null,
      systemSizeFinal: record["systemSizeFinal"] ? record["systemSizeFinal"] : null,
      recordID: record["recordID"] ? record["recordID"].replace(/"/g, "") : null,
      relatedProject: record["relatedProject"] ? record["relatedProject"] : null,
      saleStatus: record["saleStatus"] ? record["saleStatus"].replace(/"/g, "") : null,
      clawbackNotes: record["clawbackNotes"] ? record["clawbackNotes"].replace(/"/g, "") : null,
      repRedline: record["repRedline"] ? record["repRedline"].replace(/"/g, "") : null,
      repRedlineOverrride: record["repRedlineOverrride"] ? record["repRedlineOverrride"].replace(/"/g, "") : null,
      leadgenRedlineOverrride: record["leadgenRedlineOverrride"] ? record["leadgenRedlineOverrride"].replace(/"/g, "") : null,
      salesRep: record["salesRep"] ? record["salesRep"].replace(/"/g, "") : null,
      ppwFinal: record["ppwFinal"] ? record["ppwFinal"] : null,
      status: record["status"] ? record["status"] : null,
      milestone: record["milestone"] ? record["milestone"].replace(/"/g, "") : null,
      datePaid: record["datePaid"] ? record["datePaid"].replace(/"/g, "") : null,
      amount: record["amount"] ? record["amount"] : null
    }));

    console.log("Returning CRM payroll data...");

    return new SuccessResult({ payrollData: payrollResults }, CrmPayrollResultCollection);
  }

  @Post("/crmPayrollLeadgen")
  @Returns(200, SuccessResult).Of(CrmPayrollResultModel)
  public async crmPayrollLeadgen(@BodyParams() body: CrmPayBody, @Response() res: Response) {
    const { recordId } = body;
    CrmPayBody;
    if (!recordId) throw new BadRequest(MISSING_PARAMS);

    const API_URL = "https://voltaicqbapi.herokuapp.com/CRMPayrollLeadGen";

    const requestBody = {
      repID: recordId
    };

    const headers = {
      "Content-Type": "application/json"
    };

    console.log("Getting CRM Payroll...");
    console.log(recordId);

    const response = await axios.post(API_URL, requestBody, { headers });
    if (!response || !response.data) throw new BadRequest("Invalid response from Quickbase API");
    const data = response.data;
    const dataArray = Array.isArray(data) ? data : [data];
    console.log(typeof data);

    // const payrollResults = dataArray.map((record) => ({
    //   lead: record["lead"] ? record["lead"].replace(/"/g, '') : null,
    //   userStatus: record["userStatus"] ? record["userStatus"].replace(/"/g, '') : null,
    //   salesRep: record["salesRep"] ? record["salesRep"].replace(/"/g, '') : null,
    //   ppwFinal: record["ppwFinal"] ?  record["ppwFinal"]  : null,
    //   status: record["systemSizeFinal"] ? record["systemSizeFinal"]  : null,
    //   milestone: record["milestone"] ? record["milestone"].replace(/"/g, '') : null,
    //   datePaid: record["datePaid"] ? record["datePaid"].replace(/"/g, '') : null,
    //   amount: record["amount"] ? record["amount"] : null,
    //   // Add other properties here as needed
    // }));

    const payrollResults = dataArray.map((record) => ({
      lead: record["lead"] ? record["lead"].replace(/"/g, "") : null,
      userStatus: record["userStatus"] ? record["userStatus"].replace(/"/g, "") : null,
      itemType: record["itemType"] ? record["itemType"].replace(/"/g, "") : null,
      saleDate: record["saleDate"] ? record["saleDate"].replace(/"/g, "") : null,
      relatedContractAmount: record["relatedContractAmount"] ? record["relatedContractAmount"].replace(/"/g, "") : null,
      relatedDealerFee: record["relatedDealerFee"] ? record["relatedDealerFee"].replace(/"/g, "") : null,
      addersFinal: record["addersFinal"] ? record["addersFinal"].replace(/"/g, "") : null,
      systemSizeFinal: record["systemSizeFinal"] ? record["systemSizeFinal"] : null,
      recordID: record["recordID"] ? record["recordID"].replace(/"/g, "") : null,
      saleStatus: record["saleStatus"] ? record["saleStatus"].replace(/"/g, "") : null,
      clawbackNotes: record["clawbackNotes"] ? record["clawbackNotes"].replace(/"/g, "") : null,
      repRedline: record["repRedline"] ? record["repRedline"].replace(/"/g, "") : null,
      repRedlineOverrride: record["repRedlineOverrride"] ? record["repRedlineOverrride"].replace(/"/g, "") : null,
      leadgenRedlineOverrride: record["leadgenRedlineOverrride"] ? record["leadgenRedlineOverrride"].replace(/"/g, "") : null,
      salesRep: record["salesRep"] ? record["salesRep"].replace(/"/g, "") : null,
      ppwFinal: record["ppwFinal"] ? record["ppwFinal"] : null,
      relatedProject: record["relatedProject"] ? record["relatedProject"] : null,
      status: record["status"] ? record["status"] : null,
      milestone: record["milestone"] ? record["milestone"].replace(/"/g, "") : null,
      datePaid: record["datePaid"] ? record["datePaid"].replace(/"/g, "") : null,
      amount: record["amount"] ? record["amount"] : null
    }));

    console.log("Returning CRM payroll data...");

    return new SuccessResult({ payrollData: payrollResults }, CrmPayrollResultCollection);
  }

  @Post("/crmDealsRookieLedgen")
  @Returns(200, SuccessResult).Of(CrmDealResultModel)
  public async crmDealsRookieLedgens(@Response() res: Response) {
    const API_URL = "https://voltaicqbapi.herokuapp.com/CRMDealsRookieLeadgen";

    const headers = {
      "Content-Type": "application/json"
    };

    console.log("Getting CRM users...");

    const response = await axios.post(API_URL, {}, { headers });
    if (!response || !response.data) throw new BadRequest("Invalid response from Quickbase API");

    const data = response.data;

    const dataArray = Array.isArray(data) ? data : [data];

    console.log(dataArray);

    // Map over dataArray and transform its structure
    const results = dataArray.map((project) => {
      return {
        email: project["email"] ? project["email"] : null,
        projectID: project["projectID"] || "",
        repName: project["repName"] || "sss",
        homeownerName: project["homeownerName"] || null,
        salesRep: project["salesRep"] || "crm",
        leadGen: project["leadGenerator"] || "crm",
        saleDate: project["saleDate"] || null,
        ppwFinal: project["ppwFinal"] || null,
        systemSizeFinal: project["systemSizeFinal"] || null,
        stage: project["stage"] || "",
        status: project["status"] || "",
        milestone: project["milestone"] || null,

        plansReceived: project["plansReceived"] || null,
        installComplete: project["installComplete"] || null,
        ptoApproved: project["ptoApproved"] || null,

        datePaid: project["datePaid"] || null,
        amount: project["amount"] || null
      };
    });

    return new SuccessResult({ deals: results }, CrmDealResultCollection);
  }

  @Post("/crmDealsRookie")
  @Returns(200, SuccessResult).Of(CrmDealResultModel)
  public async crmDealsRookie(@Response() res: Response) {
    const API_URL = "https://voltaicqbapi.herokuapp.com/CRMDealsRookie";

    const headers = {
      "Content-Type": "application/json"
    };

    console.log("Getting CRM users...");

    const response = await axios.post(API_URL, {}, { headers });
    if (!response || !response.data) throw new BadRequest("Invalid response from Quickbase API");

    const data = response.data;

    const dataArray = Array.isArray(data) ? data : [data];

    console.log(dataArray);

    // Map over dataArray and transform its structure
    const results = dataArray.map((project) => {
      return {
        email: project["email"] ? project["email"] : null,
        projectID: project["projectID"] || "",
        repName: project["repName"] || "sss",
        homeownerName: project["homeownerName"] || null,
        salesRep: project["salesRep"] || "crm",
        leadGen: project["leadGenerator"] || "crm",
        saleDate: project["saleDate"] || null,
        ppwFinal: project["ppwFinal"] || null,
        systemSizeFinal: project["systemSizeFinal"] || null,
        stage: project["stage"] || "",
        status: project["status"] || "",
        milestone: project["milestone"] || null,

        plansReceived: project["plansReceived"] || null,
        installComplete: project["installComplete"] || null,
        ptoApproved: project["ptoApproved"] || null,

        datePaid: project["datePaid"] || null,
        amount: project["amount"] || null
      };
    });

    return new SuccessResult({ deals: results }, CrmDealResultCollection);
  }

  @Post("/crmDealsLeadgen")
  @Returns(200, SuccessResult).Of(CrmDealResultModel)
  public async crmDealsLeadgen(@BodyParams() body: CrmDealsBody, @Response() res: Response) {
    const { recordId } = body;
    CrmPayBody;
    if (!recordId) throw new BadRequest(MISSING_PARAMS);

    const API_URL = "https://voltaicqbapi.herokuapp.com/CRMDealsLeadgen";

    const requestBody = {
      repID: recordId
    };

    const headers = {
      "Content-Type": "application/json"
    };

    console.log("Getting CRM users...");

    const response = await axios.post(API_URL, requestBody, { headers });
    if (!response || !response.data) throw new BadRequest("Invalid response from Quickbase API");

    const data = response.data;

    const dataArray = Array.isArray(data) ? data : [data];

    console.log(dataArray);

    // Map over dataArray and transform its structure
    const results = dataArray.map((project) => {
      return {
        email: project["email"] ? project["email"] : null,
        projectID: project["projectID"] || "",
        repName: project["repName"] || "sss",
        homeownerName: project["homeownerName"] || null,
        salesRep: project["salesRep"] || "crm",
        leadGen: project["leadGenerator"] || "crm",
        saleDate: project["saleDate"] || null,
        ppwFinal: project["ppwFinal"] || null,
        systemSizeFinal: project["systemSizeFinal"] || null,
        stage: project["stage"] || "",
        status: project["status"] || "",
        milestone: project["milestone"] || null,

        plansReceived: project["plansReceived"] || null,
        installComplete: project["installComplete"] || null,
        ptoApproved: project["ptodate"] || null,

        datePaid: project["datePaid"] || null,
        amount: project["amount"] || null
      };
    });

    return new SuccessResult({ deals: results }, CrmDealResultCollection);
  }

  // SINGLE CRM DEAL
  //add heroku

  @Post("/crmDeal")
  @Returns(200, SuccessResult).Of(SingleCrmDealResultModel)
  public async crmDeal(@BodyParams() body: CrmDealsBody, @Response() res: Response) {
    const { recordId } = body;
    CrmPayBody;
    if (!recordId) throw new BadRequest(MISSING_PARAMS);

    const API_URL = "https://voltaicqbapi.herokuapp.com/CRMDeal";

    ///Deal ID changed here!
    const requestBody = {
      dealID: recordId
    };

    const headers = {
      "Content-Type": "application/json"
    };

    console.log("Getting CRM deal...");

    const response = await axios.post(API_URL, requestBody, { headers });
    if (!response || !response.data) throw new BadRequest("Invalid response from Quickbase API");

    const data = response.data;
    console.log(data);

    // Transform the structure as needed
    const result = {
      email: data["email"] ? data["email"] : null,
      projectID: data["projectID"] || "",
      repName: data["repName"] || "sss",
      homeownerName: data["homeownerName"] || null,
      salesRep: data["salesRep"] || "crm",
      leadGen: data["leadGenerator"] || "crm",
      saleDate: data["saleDate"] || null,
      products: data["products"] || null,
      progress: data["progress"] || null,
      ppwFinal: data["ppwFinal"] || null,
      systemSizeFinal: data["systemSizeFinal"] || null,
      stage: data["stage"] || "",
      contractAmount: data["contractAmount"] || "",
      addersTotal: data["addersTotal"] || "",
      dealerFee: data["dealerFee"] || "",
      installer: data["installer"] || "",
      status: data["status"] || "",
      milestone: data["milestone"] || null,
      plansReceived: data["plansReceived"] || null,
      installComplete: data["installComplete"] || null,
      ptoApproved: data["ptoApproved"] || null,
      datePaid: data["datePaid"] || null,
      amount: data["amount"] || null,
      address: data["address"] || "",
      vcmessages: data["vcmessages"] || [], // Assuming vcmessages field exists and is an array
      vcadders: data["vcAdders"] || [],
      vccommissions: data["payrollItems"] || [], // Assuming vcmadders field exists and is an array,
      welcomeDate: data["welcomeDate"] || null,
      siteSurveyDate: data["siteSurveyDate"] || null,
      NTPDate: data["ntpDate"] || null,
      QcChecDate: data["qcCheckDate"] || null,
      FLADate: data["flaDate"] || null,
      SolarPermitDate: data["solarPermitDate"] || null,
      solarInstallDate: data["solarInstallDate"] || null,
      FIDate: data["fidate"] || null,
      PTODate: data["ptodate"] || null,
      financing: data["financing"] || null,
      fdacp: data["fdacp"] || null,
      BatteryPermitDate: data["batteryPermitDate"] || null,
      BatteryApprovalDate: data["batteryApproval"] || null,
      OrderBatterDate: data["orderBattery"] || null,
      BatteryInstallDate: data["batteryInstall"] || null,
      FireInspectionDate: data["fireInspectionDate"] || null,
      HVACSaleDate: data["hvacsale"] || null,
      HVACInstallDate: data["hvacinstallDate"] || null,
      HVACPermitDate: data["hvcacpermitDate"] || null,
      MeterSpotDate: data["meterSpot"] || null,
      MPUPermitDate: data["mpupermitDate"] || null,
      MPUInstallDate: data["mpuinstall"] || null,
      MPUInspectinoDate: data["mpuinspection"] || null,
      QuietCoolDate: data["quietCoolDate"] || null,
      InsulationDate: data["insulationDate"] || null,
      RoofPermitDate: data["roofPermit"] || null,
      RoofInstallDate: data["roofInstall"] || null,
      RoofInspectionDate: data["roofInspection"] || null,
      RoofColorSelectionDate: data["roofColorSelection"] || null,
      ServiceInspectionDate: data["serviceInspection"] || null,
      ServiceDate: data["serviceDate"] || null,
      PlansServiceDate: data["plansService"] || null,
      FinalInspectionServiceDate: data["fiservice"] || null,
      PTOServiceDate: data["ptoservice"] || null,
      PartnerSubmissionDate: data["partnerSubmission"] || null,
      InvoiceInpsectionDate: data["invoiceInspection"] || null,
      InvociePTODate: data["invoicePTO"] || null,
      InvoiceServiceDate: data["invoiceService"] || null,
      FDACPServiceDate: data["fdaserviceDate"] || null,
      ServicePackageSubmittedDate: data["servicePackageDate"] || null
    };

    //prod
    console.log("Result : ");

    console.log(result);

    const singleCrmDealResultModel = new SingleCrmDealResultModel(result); // Pass the result object as a single parameter

    return new SuccessResult(singleCrmDealResultModel, SingleCrmDealResultModel);
  }

  @Post("/askOpenAI")
  @Returns(200, SuccessResult).Of(AIResponseModel)
  public async askOpenAI(@BodyParams() body: any, @Response() res: Response) {
    //added productsclea

    //added
    try {
      // Extract the question from the request body
      const userQuestion = body.question;

      // Assuming openAIService.askQuestion is correctly implemented
      const aiResponseText = await openAIService.askQuestion(userQuestion);

      // Create an instance of AIResponseModel
      const responseModel = new AIResponseModel();
      responseModel.response = aiResponseText;

      // Return the response wrapped in a SuccessResult
      // Pass the instance and the class (constructor) for serialization
      return new SuccessResult(responseModel, AIResponseModel);
    } catch (error) {
      console.error(error);
      throw new BadRequest("Error processing your question");
    }
  }

  @Post("/crmRatesInActive")
  @Returns(200, SuccessResult).Of(CrmRateResultModel)
  public async crmRatesInActive(@Response() res: Response) {
    const API_URL = "https://voltaicqbapi.herokuapp.com/CRMRatesInActive";

    const headers = {
      "Content-Type": "application/json"
    };

    console.log("Getting CRM users...");

    const response = await axios.post(API_URL, {}, { headers });
    if (!response || !response.data) throw new BadRequest("Invalid response from Quickbase API");

    const data = response.data;

    const dataArray = Array.isArray(data) ? data : [data];

    console.log(dataArray);

    // Map over dataArray and transform its structure
    const results = dataArray.map((project) => {
      return {
        partner: project["fulfillmentPartner"] || null,
        years: project["years"] || null,
        status: project["status"] || null,
        financing: project["financing"] || null,
        apr: project["apr"] || null,
        feerate: project["feeRate"] || null
      };
    });

    return new SuccessResult({ rates: results }, CrmRatesResultCollection);
  }

  //CRM DEALS
  @Post("/crmDealsGlobal")
  @Returns(200, SuccessResult).Of(CrmDealResultModel)
  public async crmDealsGlobal(@BodyParams() body: CrmDealsBody, @Response() res: Response) {
    const { recordId } = body;
    CrmPayBody;
    if (!recordId) throw new BadRequest(MISSING_PARAMS);

    const API_URL = "https://voltaicqbapi.herokuapp.com/CRMDealsReport";

    const requestBody = {
      repID: recordId
    };

    const headers = {
      "Content-Type": "application/json"
    };

    console.log("Getting CRM users...");

    const response = await axios.post(API_URL, requestBody, { headers });
    if (!response || !response.data) throw new BadRequest("Invalid response from Quickbase API");

    const data = response.data;

    const dataArray = Array.isArray(data) ? data : [data];

    console.log(dataArray);

    // Map over dataArray and transform its structure
    const results = dataArray.map((project) => {
      return {
        email: project["email"] ? project["email"] : null,
        projectID: project["projectID"] || "",
        repName: project["repName"] || "sss",
        homeownerName: project["homeownerName"] || null,
        salesRep: project["salesRep"] || "crm",
        leadGen: project["leadGenerator"] || "crm",
        saleDate: project["saleDate"] || null,
        ppwFinal: project["ppwFinal"] || null,
        systemSizeFinal: project["systemSizeFinal"] || null,
        stage: project["stage"] || "",
        status: project["status"] || "",
        milestone: project["milestone"] || null,
        plansReceived: project["plansReceived"] || null,
        installComplete: project["installComplete"] || null,
        ptoApproved: project["ptoApproved"] || null,
        datePaid: project["datePaid"] || null,
        amount: project["amount"] || null,
        installer: project["installer"] || null,
        financing: project["financing"] || null
      };
    });

    return new SuccessResult({ deals: results }, CrmDealResultCollection);
  }

  @Post("/previousPay")
  @Returns(200, SuccessResult).Of(PreviousPayResultModel)
  public async previousPay(@BodyParams() body: CrmDealsBody, @Response() res: Response) {
    const { recordId } = body;
    CrmPayBody;
    if (!recordId) throw new BadRequest(MISSING_PARAMS);

    const API_URL = "https://voltaicqbapi.herokuapp.com/PreviousPay";

    const requestBody = {
      repID: recordId
    };

    const headers = {
      "Content-Type": "application/json"
    };

    console.log("Getting CRM users Anticipated Pa..");

    console.log(API_URL);

    const response = await axios.post(API_URL, requestBody, { headers });
    if (!response || !response.data) throw new BadRequest("Invalid response from Quickbase API");

    const data = response.data;

    const dataArray = Array.isArray(data) ? data : [data];

    console.log(dataArray);

    // Map over dataArray and transform its structure
    const results = dataArray.map((project) => {
      return {
        homeownerName: project["homeownerName"] || null,
        amount: project["amount"] || null,
        upcomingMileStonePayout: project["upcomingMilestonePayout"] || null,
        datePaid: project["datePaid"] || null,
        salesRep: project["salesRep"] || null
      };
    });

    return new SuccessResult({ deals: results }, PreviousPayCollection);
  }

  @Post("/upcomingPay")
  @Returns(200, SuccessResult).Of(FuturePayResultModel)
  public async upcomingPay(@BodyParams() body: CrmDealsBody, @Response() res: Response) {
    const { recordId } = body;
    CrmPayBody;
    if (!recordId) throw new BadRequest(MISSING_PARAMS);

    const API_URL = "https://voltaicqbapi.herokuapp.com/UpcomingPay";

    const requestBody = {
      repID: recordId
    };

    const headers = {
      "Content-Type": "application/json"
    };

    console.log("Getting CRM users Anticipated Pa...");

    console.log(API_URL);

    const response = await axios.post(API_URL, requestBody, { headers });
    if (!response || !response.data) throw new BadRequest("Invalid response from Quickbase API");

    const data = response.data;

    const dataArray = Array.isArray(data) ? data : [data];

    console.log(dataArray);

    // Map over dataArray and transform its structure
    const results = dataArray.map((project) => {
      return {
        recordID: project["recordID"] || null,
        m1Date: project["m1Date"] || null,
        m2Date: project["m2Date"] || null,
        m3Date: project["m3Date"] || null,
        plansReqDate: project["plansReqDate"] || null,
        milestone: project["upcomingMilestonePayout"] || null,
        homeownerName: project["homeownerName"] || null,
        contractAmount: project["contractAmount"] || null,
        salesRep: project["salesRep"] || null
      };
    });

    return new SuccessResult({ deals: results }, UpcomginPayCollection);
  }

  //CRM DEALS
  @Post("/crmDeals")
  @Returns(200, SuccessResult).Of(CrmDealResultModel)
  public async crmDeals(@BodyParams() body: CrmDealsBody, @Response() res: Response) {
    const { recordId } = body;
    CrmPayBody;
    if (!recordId) throw new BadRequest(MISSING_PARAMS);

    const API_URL = "https://voltaicqbapi.herokuapp.com/CRMDeals";

    const requestBody = {
      repID: recordId
    };

    const headers = {
      "Content-Type": "application/json"
    };

    console.log("Getting CRM users!!!...");

    const response = await axios.post(API_URL, requestBody, { headers });
    if (!response || !response.data) throw new BadRequest("Invalid response from Quickbase API");

    const data = response.data;

    const dataArray = Array.isArray(data) ? data : [data];

    console.log(dataArray);

    // Map over dataArray and transform its structure
    const results = dataArray.map((project) => {
      return {
        email: project["email"] ? project["email"] : null,
        projectID: project["projectID"] || "",
        repName: project["repName"] || "sss",
        homeownerName: project["homeownerName"] || null,
        salesRep: project["salesRep"] || "crm",
        leadGen: project["leadGenerator"] || "crm",
        saleDate: project["saleDate"] || null,
        ppwFinal: project["ppwFinal"] || null,
        systemSizeFinal: project["systemSizeFinal"] || null,
        stage: project["stage"] || "",
        status: project["status"] || "",
        milestone: project["milestone"] || null,
        plansReceived: project["plansReceived"] || null,
        installComplete: project["installComplete"] || null,
        ptoApproved: project["ptoApproved"] || null,
        datePaid: project["datePaid"] || null,
        amount: project["amount"] || null
      };
    });

    return new SuccessResult({ deals: results }, CrmDealResultCollection);
  }

  @Put("/reset-password")
  @Returns(200, SuccessResult).Of(SuccessMessageModel)
  public async resetPassword(@BodyParams() body: UpdateAdminPasswordParams) {
    const { code, password } = body;
    if (!code || !password) throw new BadRequest(MISSING_PARAMS);
    const verification = await this.verificationService.verifyToken({ verificationToken: code });
    if (!verification) throw new BadRequest(INVALID_TOKEN);
    await this.adminService.updateAdminPassword({ email: verification.email, password });
    return new SuccessResult({ success: true, message: "Password updated successfully" }, SuccessMessageModel);
  }

  @Put("/complete-verification")
  @Returns(200, SuccessResult).Of(SuccessMessageModel)
  public async completeVerification(@BodyParams() body: VerificationSuccessModel) {
    const { email, code } = body;
    if (!email || !code) throw new BadRequest(MISSING_PARAMS);
    await this.verificationService.verifyCode({ email, code });
    return new SuccessResult(
      {
        success: true,
        message: "verification completed successfully"
      },
      SuccessMessageModel
    );
  }

  @Post("/logout")
  @Returns(200, SuccessResult).Of(SuccessMessageModel)
  public async adminLogout(@Req() req: Req, @Res() res: Res) {
    const sessionCookie = req.cookies.session || "";
    res.clearCookie("session");
    await this.adminService.deleteSessionCookie(sessionCookie);
    return new SuccessResult({ success: true, message: "logout successfully" }, SuccessMessageModel);
  }

  @Post("/crmRatesActive")
  @Returns(200, SuccessResult).Of(CrmRateResultModel)
  public async crmRatesActive(@Response() res: Response) {
    const API_URL = "https://voltaicqbapi.herokuapp.com/CRMRatesActive";

    const headers = {
      "Content-Type": "application/json"
    };

    console.log("Getting CRM users...");

    const response = await axios.post(API_URL, {}, { headers });
    if (!response || !response.data) throw new BadRequest("Invalid response from Quickbase API");

    const data = response.data;

    const dataArray = Array.isArray(data) ? data : [data];

    console.log(dataArray);

    // Map over dataArray and transform its structure
    const results = dataArray.map((project) => {
      return {
        partner: project["fulfillmentPartner"] || null,
        years: project["years"] || null,
        status: project["status"] || null,
        financing: project["financing"] || null,
        apr: project["apr"] || null,
        feerate: project["feeRate"] || null
      };
    });

    return new SuccessResult({ rates: results }, CrmRatesResultCollection);
  }

  //===================

  @Post("/crmAvgTimelines")
  @Returns(200, SuccessResult).Of(CrmTimelineResultModel)
  public async crmAvgTimelines(@BodyParams() body: timelineBody, @Response() res: Response) {
    const API_URL = "https://voltaicqbapi.herokuapp.com/CRMTimelines";

    const requestBody = {
      repID: body.repId
    };

    const headers = {
      "Content-Type": "application/json"
    };

    console.log("Getting CRM users...");

    const response = await axios.post(API_URL, requestBody, { headers });

    console.log(response);
    const data = response.data;

    const item = data; // Assuming data is the object you are working with

    // Check if data is not an array or empty
    // Log the original item for debugging
    console.log("Original Item:", item);

    // Check if item is not an object or is empty
    if (typeof item !== "object" || Object.keys(item).length === 0) {
      throw new Error("Expected data to be a non-empty object");
    }

    const results = {
      saleStage: item.saleStage,
      welcometage: item.welcometage,
      sstage: item.sstage,
      ntpstage: item.ntpstage,
      qcStage: item.qcStage,
      planStage: item.planStage,
      flatage: item.flatage,
      permitStage: item.permitStage,
      installStage: item.installStage,
      inspectStage: item.inspectStage,
      ptoStage: item.ptoStage
    };

    return new SuccessResult({ timeline: results }, Avgtimeline);
  }

  @Post("/crmAHJTimelines")
  @Returns(200, SuccessResult).Of(CrmTimelineResultModel)
  public async crmAHJTimelines(@BodyParams() body: timelineBody, @Response() res: Response) {
    const API_URL = "https://voltaicqbapi.herokuapp.com/CRMTimelinesByAHJ";

    const requestBody = {
      repID: body.repId
    };

    const headers = {
      "Content-Type": "application/json"
    };

    console.log("Getting CRM users...");

    const response = await axios.post(API_URL, requestBody, { headers });

    console.log(response);
    const data = response.data;

    if (!Array.isArray(data)) {
      throw new Error("Expected data to be an array");
    }
    // Instead of checking if the data is an array, just convert it to the Timeline format
    const results = data.map((item) => ({
      saleStage: item.averageSaleToWelcome ? item.averageSaleToWelcome.toString() : null,
      welcometage: item.averageWelcomeToSS ? item.averageWelcomeToSS.toString() : null,
      sstage: item.averageSsToNTP ? item.averageSsToNTP.toString() : null,
      ntpstage: item.averageNTPToQC ? item.averageNTPToQC.toString() : null,
      qcStage: item.averageQcToPlans ? item.averageQcToPlans.toString() : null,
      planStage: item.averagePlansToFLA ? item.averagePlansToFLA.toString() : null,
      flatage: item.averageFLAToPermit ? item.averageFLAToPermit.toString() : null,
      permitStage: item.averagePermitToInstallation ? item.averagePermitToInstallation.toString() : null,
      installStage: item.averageInstallationToInspection ? item.averageInstallationToInspection.toString() : null,
      inspectStage: item.averageFIToPTO ? item.averageFIToPTO.toString() : null,
      ptoStage: item.ptoStage ? item.ptoStage.toString() : null,
      AHJ: item.ahj ? item.ahj.toString() : null
    }));

    return new SuccessResult({ timeline: results }, AhjTimeline);
  }

  // @Post("/crmTimelines")
  // @Returns(200, SuccessResult).Of(CrmRateResultModel)
  // public async crmTimelines( @BodyParams() body: timelineBody,@Response() res: Response) {

  //   const API_URL = "https://voltaicqbapi.herokuapp.com/CRMTimelines";

  //   const requestBody = {
  //     repID: body.repId,
  //   };
  //   // const requestBody = {
  //   //   repId: args.repId,
  //   // };

  //   const headers = {
  //     "Content-Type": "application/json",
  //   };

  //   console.log("Getting CRM users...");

  //   const response = await axios.post(API_URL, requestBody, { headers });

  //   console.log(response)
  //   const data = response.data;
  //   console.log("Data");
  //   console.log(data);

  //   console.log(typeof data);

  //   // Instead of checking if the data is an array, just convert it to the Timeline format
  //   const timeline = {
  //     saleStage: data.saleStage ? data.saleStage.toString() : null,
  //     welcometage: data.welcometage ? data.welcometage.toString() : null,
  //     sstage: data.sstage ? data.sstage.toString() : null,
  //     ntpstage: data.ntpstage ? data.ntpstage.toString() : null,
  //     qcStage: data.qcStage ? data.qcStage.toString() : null,
  //     planStage: data.planStage ? data.planStage.toString() : null,
  //     flatage: data.flatage ? data.flatage.toString() : null,
  //     permitStage: data.permitStage ? data.permitStage.toString() : null,
  //     installStage: data.installStage ? data.installStage.toString() : null,
  //     inspectStage: data.inspectStage ? data.inspectStage.toString() : null,
  //     ptoStage: data.ptoStage ? data.ptoStage.toString() : null,
  //   };

  //   // Map over dataArray and transform its structure
  //   // const results = dataArray.map((project) => {
  //   //   return {
  //   //     partner: project["fulfillmentPartner"] || null,
  //   //     years: project["years"] || null,
  //   //     status: project["status"] ||null,
  //   //     financing: project["financing"] || null,
  //   //     apr: project["apr"] ||null,
  //   //     feerate: project["feeRate"] || null,

  //   //   };
  //   // });

  //   return new SuccessResult({ rates: results }, CrmRatesResultCollection);
  // }
}
