import { ArrayOf, Enum, Property, Required, CollectionOf as TsEdCollectionOf } from "@tsed/schema";
import { Model } from "@tsed/mongoose";
import { SocialAction } from "../../types";
import { CategoryFieldType } from "./CategoryModel";

export class IdModel {
  @Required() public readonly id: string;
}

export class AdminModel {
  @Property() public readonly resetPass: boolean;
  @Property() public readonly role: string;
  @Property() public readonly company: string;
  @Property() public readonly email: string;
  @Property() public readonly unlocked: string;
  @Property() public readonly twoFactorEnabled: boolean;
}
export class AdminRoleModel {
  @Property() public readonly id: string;
  @Property() public readonly role: string;
  @Property() public readonly email: string;
}
export class VerificationSuccessModel {
  @Required() public readonly email: string;
  @Required() public readonly code: string;
}
export class SuccessMessageModel {
  @Property() public readonly success: boolean;
  @Property() public readonly message: string;
}
export class IsVerificationTokenCompleteModel extends SuccessMessageModel {
  @Property() public readonly verificationToken: string;
}
export class AdminProfileResultModel {
  @Property() public readonly name: string;
  @Property() public readonly email: string;
  @Property() public readonly company: string;
  @Property() public readonly enabled: boolean;
  @Property() public readonly orgId: string;
  @Property() public readonly imageUrl: string;
  @Property() public readonly verifyStatus: string;
}
@Model()
export class AdminResultModel {
  @Property() _id: string;
  @Property() name: string;
  @Property() email: string;
  @Property() role: string;
  @Property() phone?: string;
  @Property() createdAt?: Date;
}

export class AuthUserModel {
  @Property() name: string;
  @Property() email: string;
  @Property() role: string;
}

export class AuthResultModel {
  @Property() user: AuthUserModel;
  @Property() token: string;
}

export class OrganizationResultModel {
  @Property() public readonly id: string;
  @Property() public readonly name: string;
  @Property() public readonly email: string;
  @Property() public readonly createdAt: Date;
  @Property() public readonly updatedAt: Date;
}

export class CategoryResultModel {
  @Property() public readonly id: string;
  @Property() public readonly name: string;
  @Property() public readonly description: string;
  @Property() public readonly adminId: string;
  @Property() public readonly orgId: string;
  @ArrayOf(Object) public readonly fields: CategoryFieldType[];
  @Property() public readonly createdAt: Date;
  @Property() public readonly updatedAt: Date;
}

export class LeadResultModel {
  @Property() public readonly _id: string;
  @Property() public readonly firstName: string;
  @Property() public readonly lastName: string;
  @Property() public readonly email: string;
  @Property() public readonly phone: string;
  @Property() public readonly categoryId: string;
  @Property() public readonly orgId: string;
  @Property() public readonly createdAt: Date;
  @Property() public readonly updatedAt: Date;
}

export class SingleCrmDealResultModel {
  @Property() public readonly email: string;
  @Property() public readonly projectID: string;
  @Property() public readonly plansReceived: string;
  @Property() public readonly progress: string;
  @Property() public readonly installComplete: string;
  @Property() public readonly ptoApproved: string;
  @Property() public readonly homeownerName: string;
  @Property() public readonly repName: string;
  @Property() public readonly saleDate: string;
  @Property() public readonly leadGen: string;
  @Property() public readonly salesRep: string;
  @Property() public readonly ppwFinal: string;
  @Property() public readonly systemSizeFinal: string;
  @Property() public readonly stage: string;
  @Property() public readonly status: string;
  @Property() public readonly milestone: string;
  @Property() public readonly datePaid: string;
  @Property() public readonly amount: string;
  @Property() public readonly address: string;

  @Property() public readonly products: string;

  @Property() public readonly contractAmount: string;
  @Property() public readonly dealerFee: string;
  @Property() public readonly addersTotal: string;
  @Property() public readonly installer: string;

  @Property() public readonly welcomeDate: string;
  @Property() public readonly siteSurveyDate: string;
  @Property() public readonly NTPDate: string;
  @Property() public readonly QcChecDate: string;
  @Property() public readonly FLADate: string;
  @Property() public readonly SolarPermitDate: string;
  @Property() public readonly solarInstallDate: string;
  @Property() public readonly FIDate: string;
  @Property() public readonly PTODate: string;
  @Property() public readonly financing: string;

  //Newly added

  @Property() public readonly batteryPermitDate: string;
  @Property() public readonly fdacp: string;
  @Property() public readonly batteryApprovalDate: string;
  @Property() public readonly OrderBatteryDate: string;
  @Property() public readonly BatteryinstallDate: string;
  @Property() public readonly FireInspectionDate: string;
  @Property() public readonly HVACSaleDate: string;
  @Property() public readonly HVACInstallDate: string;
  @Property() public readonly HVACPermitDate: string;
  @Property() public readonly MeterspotDate: string;
  @Property() public readonly MPUPermitDate: string;
  @Property() public readonly MPUPInstallDate: string;
  @Property() public readonly MPUInspectionDate: string;
  @Property() public readonly QuietCoolDate: string;
  @Property() public readonly InsulationDate: string;
  @Property() public readonly RoofPermitDate: string;
  @Property() public readonly RoofInstallDate: string;
  @Property() public readonly RoofInspectionDate: string;
  @Property() public readonly RoofColorSelectionDate: string;
  @Property() public readonly ServiceInspectionDate: string;
  @Property() public readonly ServiceDate: string;
  @Property() public readonly PlansServiceDate: string;
  @Property() public readonly FinalInspectionServiceDate: string;
  @Property() public readonly PTOServiceDate: string;
  @Property() public readonly PartnerSubmissionDate: string;
  @Property() public readonly InvoiceSerivceDate: string;
  @Property() public readonly InvoiceInspectionDate: string;
  @Property() public readonly InvoicePTODate: string;
  @Property() public readonly FDACPServiceDate: string;
  @Property() public readonly ServicePackageSubmittedDate: string;

  @Property() public readonly vcmessages: {
    relatedProject: string;
    type: string;
    from: string;
    text: string;
    createdAt: string;
  }[]; // Define vcmessages as an array of objects

  @Property() public readonly vcadders: {
    relatedProject: string;
    description: string;
    quantity: string;
    price: string;
    status: string;
    billTo: string;
  }[]; // Define vcmessages as an array of objects
  @Property() public readonly vccommissions: {
    user: string;
    itemType: string;
    relateProject: string;
    status: string;
    milestone: string;
    datePaid: string;
    amount: string;
    paidBy: string;
  }[]; // Define vcmessages as an array of objects

  constructor(data: {
    welcomeDate: string;
    progress: string;
    siteSurveyDate: string;
    NTPDate: string;
    products: string;
    financing: string;
    QcChecDate: string;
    FLADate: string;
    SolarPermitDate: string;
    solarInstallDate: string;
    FIDate: string;
    PTODate: string;
    installer: string;
    contractAmount: string;
    dealerFee: string;
    addersTotal: string;
    email: string;
    projectID: string;
    plansReceived: string;
    installComplete: string;
    ptoApproved: string;
    homeownerName: string;
    repName: string;
    saleDate: string;
    leadGen: string;
    salesRep: string;
    ppwFinal: string;
    systemSizeFinal: string;
    stage: string;
    status: string;
    milestone: string;
    datePaid: string;
    amount: string;
    address: string;
    fdacp: string;

    BatteryPermitDate: string;
    BatteryApprovalDate: string;
    OrderBatterDate: string;
    BatteryInstallDate: string;
    FireInspectionDate: string;
    HVACSaleDate: string;
    HVACInstallDate: string;
    HVACPermitDate: string;
    MeterSpotDate: string;
    MPUPermitDate: string;
    MPUInstallDate: string;
    MPUInspectinoDate: string;
    QuietCoolDate: string;
    InsulationDate: string;
    RoofPermitDate: string;
    RoofInstallDate: string;
    RoofInspectionDate: string;
    RoofColorSelectionDate: string;
    ServiceInspectionDate: string;
    ServiceDate: string;
    PlansServiceDate: string;
    FinalInspectionServiceDate: string;
    PTOServiceDate: string;
    PartnerSubmissionDate: string;
    InvoiceInpsectionDate: string;
    InvociePTODate: string;
    InvoiceServiceDate: string;
    FDACPServiceDate: string;
    ServicePackageSubmittedDate: string;

    vcmessages: {
      relatedProject: string;
      type: string;
      from: string;
      text: string;
      createdAt: string;
    }[]; // Define vcmessages as an array of objects
    vcadders: {
      relatedProject: string;
      description: string;
      quantity: string;
      price: string;
      status: string;
      billTo: string;
    }[]; // Define vcmessages as an array of objects
    vccommissions: {
      user: string;
      itemType: string;
      relateProject: string;
      status: string;
      milestone: string;
      datePaid: string;
      amount: string;
      paidBy: string;
    }[]; // Define vcmessages as an array of objects
  }) {
    this.email = data.email;
    this.products = data.products;
    this.progress = data.progress;
    this.projectID = data.projectID;
    this.plansReceived = data.plansReceived;
    this.installComplete = data.installComplete;
    this.financing = data.financing;
    this.ptoApproved = data.ptoApproved;
    this.homeownerName = data.homeownerName;
    this.repName = data.repName;
    this.saleDate = data.saleDate;
    this.leadGen = data.leadGen;
    this.salesRep = data.salesRep;
    this.ppwFinal = data.ppwFinal;
    this.systemSizeFinal = data.systemSizeFinal;
    this.stage = data.stage;
    this.status = data.status;
    this.fdacp = data.fdacp;
    this.installer = data.installer;
    this.contractAmount = data.contractAmount;
    this.dealerFee = data.dealerFee;
    this.addersTotal = data.addersTotal;

    this.milestone = data.milestone;
    this.datePaid = data.datePaid;
    this.amount = data.amount;
    this.address = data.address;
    this.vcmessages = data.vcmessages;
    this.vcadders = data.vcadders;
    this.vccommissions = data.vccommissions;
    this.welcomeDate = data.welcomeDate;
    this.siteSurveyDate = data.siteSurveyDate;
    this.NTPDate = data.NTPDate;
    this.QcChecDate = data.QcChecDate;
    this.FLADate = data.FLADate;
    this.SolarPermitDate = data.SolarPermitDate;
    this.solarInstallDate = data.solarInstallDate;
    this.FIDate = data.FIDate;
    this.PTODate = data.PTODate;

    this.batteryPermitDate = data.BatteryPermitDate;
    this.batteryApprovalDate = data.BatteryApprovalDate;
    this.OrderBatteryDate = data.OrderBatterDate;
    this.BatteryinstallDate = data.BatteryInstallDate;
    this.FireInspectionDate = data.FireInspectionDate;
    this.HVACSaleDate = data.HVACSaleDate;
    this.HVACInstallDate = data.HVACInstallDate;
    this.HVACPermitDate = data.HVACPermitDate;
    this.MeterspotDate = data.MeterSpotDate;
    this.MPUPermitDate = data.MPUPermitDate;
    this.MPUPInstallDate = data.MPUInstallDate;
    this.MPUInspectionDate = data.MPUInspectinoDate;
    this.QuietCoolDate = data.QuietCoolDate;
    this.InsulationDate = data.InsulationDate;
    this.RoofPermitDate = data.RoofPermitDate;
    this.RoofInstallDate = data.RoofInstallDate;
    this.RoofInspectionDate = data.RoofInspectionDate;
    this.RoofColorSelectionDate = data.RoofColorSelectionDate;
    this.ServiceInspectionDate = data.ServiceInspectionDate;
    this.ServiceDate = data.ServiceDate;
    this.PlansServiceDate = data.PlansServiceDate;
    this.FinalInspectionServiceDate = data.FinalInspectionServiceDate;
    this.PTOServiceDate = data.PTOServiceDate;
    this.PartnerSubmissionDate = data.PTOServiceDate;
    this.InvoiceInspectionDate = data.InvoiceInpsectionDate;
    this.InvoiceSerivceDate = data.InvoiceServiceDate;
    this.InvoicePTODate = data.InvociePTODate;
    this.FDACPServiceDate = data.FDACPServiceDate;
    this.ServicePackageSubmittedDate = data.ServicePackageSubmittedDate;
  }
}

export class CrmRateResultModel {
  @Property() public readonly partner: string;
  @Property() public readonly years: string;
  @Property() public readonly status: string;
  @Property() public readonly financing: string;
  @Property() public readonly apr: string;
  @Property() public readonly feerate: string;
}

export class CrmTimelineAvgResultModel {
  @Property() public readonly saleStage: string;
  @Property() public readonly welcometage: string;
  @Property() public readonly sstage: string;
  @Property() public readonly ntpstage: string;
  @Property() public readonly qcStage: string;
  @Property() public readonly planStage: string;
  @Property() public readonly flatage: string;
  @Property() public readonly permitStage: string;
  @Property() public readonly installStage: string;
  @Property() public readonly inspectStage: string;
  @Property() public readonly ptoStage: string;
}

export class CrmTimelineResultModel {
  @Property() public readonly saleStage: string;
  @Property() public readonly welcometage: string;
  @Property() public readonly sstage: string;
  @Property() public readonly ntpstage: string;
  @Property() public readonly qcStage: string;
  @Property() public readonly planStage: string;
  @Property() public readonly flatage: string;
  @Property() public readonly permitStage: string;
  @Property() public readonly installStage: string;
  @Property() public readonly inspectStage: string;
  @Property() public readonly ptoStage: string;
  @Property() public readonly AHJ: string;
}

export class AIResponseModel {
  @Property() public response: string; // removed the readonly modifier
}

export class CrmDealRookieResultModel {
  @Property() public readonly email: string;
  @Property() public readonly projectID: string;
  @Property() public readonly plansReceived: string;
  @Property() public readonly installComplete: string;
  @Property() public readonly ptoApproved: string;
  @Property() public readonly homeownerName: string;
  @Property() public readonly repName: string;
  @Property() public readonly saleDate: string;
  @Property() public readonly leadGen: string;
  @Property() public readonly salesRep: string;
  @Property() public readonly ppwFinal: string;
  @Property() public readonly systemSizeFinal: string;
  @Property() public readonly stage: string;
  @Property() public readonly status: string;
  @Property() public readonly milestone: string;
  @Property() public readonly datePaid: string;
  @Property() public readonly amount: string;
}

export class PreviousPayResultModel {
  @Property() public readonly homeownerName: string;
  @Property() public readonly upcomingMileStonePayout: string;
  @Property() public readonly datePaid: string;
  @Property() public readonly amount: string;
  @Property() public readonly salesRep: string;
}

export class FuturePayResultModel {
  @Property() public readonly homeownerName: string;
  @Property() public readonly recordID: string;
  @Property() public readonly salesRep: string;
  @Property() public readonly m1Date: string;
  @Property() public readonly m2Date: string;
  @Property() public readonly m3Date: string;
  @Property() public readonly plansReqDate: string;
  @Property() public readonly contractAmount: string;
  @Property() public readonly milestone: string;
}

export class CrmDealResultModel {
  @Property() public readonly email: string;
  @Property() public readonly projectID: string;
  @Property() public readonly plansReceived: string;
  @Property() public readonly installComplete: string;
  @Property() public readonly ptoApproved: string;
  @Property() public readonly homeownerName: string;
  @Property() public readonly repName: string;
  @Property() public readonly saleDate: string;
  @Property() public readonly leadGen: string;
  @Property() public readonly salesRep: string;
  @Property() public readonly ppwFinal: string;
  @Property() public readonly systemSizeFinal: string;
  @Property() public readonly stage: string;
  @Property() public readonly status: string;
  @Property() public readonly milestone: string;
  @Property() public readonly datePaid: string;
  @Property() public readonly amount: string;
  @Property() public readonly installer: string;
  @Property() public readonly financing: string;
}

export class NewSaleResultModel {
  @Property() public readonly installer: string;
  @Property() public readonly atticImage: string;
  @Property() public readonly utilityImage1: string;
  @Property() public readonly licenseimage: string;
  @Property() public readonly depositImage: string;
  @Property() public readonly program: string;
  @Property() public readonly notes: string;
  @Property() public readonly recordID: string;
  @Property() public readonly leadGen: string;
  @Property() public readonly utilityImage2: string;
  @Property() public readonly utilityImage3: string;
  @Property() public readonly utilityImage4: string;
  @Property() public readonly utilityImage5: string;
  @Property() public readonly utilityImage6: string;
  @Property() public readonly utilityImage7: string;
  @Property() public readonly atticImage2: string;
  @Property() public readonly design: string;
  @Property() public readonly designNotes: string; // Change to match the type you need
  @Property() public readonly mpuNotes: string; // Change to match the type you need
  @Property() public readonly mpu: string;
  @Property() public readonly adders: string;
  @Property() public readonly salesRep: string; // Change to match the type you need
  @Property() public readonly batteryQuantity: string; // Change to match the type you need
  @Property() public readonly batteryPlacementNotes: string; // Change to match the type you need
  @Property() public readonly ownerName: string; // Change to match the type you need
  @Property() public readonly inverter: string; // Change to match the type you need
  @Property() public readonly batteries: string; // Change to match the type you need
  @Property() public readonly batteryMode: string; // Change to match the type you need
  @Property() public readonly batteryPlacement: string; // Change to match the type you need
}

export class UtilityBillResultModel {
  @Property()
  public annualUsage: number; // Assuming 'Annual Usage' is a numeric value
}

export class CrmPayrollResultModel {
  @Property() public readonly lead: string;
  @Property() public readonly relatedProject: string;
  @Property() public readonly userStatus: string;
  @Property() public readonly itemType: string;
  @Property() public readonly saleDate: string;
  @Property() public readonly relatedContractAmount: string;
  @Property() public readonly relatedDealerFee: string;

  @Property() public readonly addersFinal: string;
  @Property() public readonly systemSizeFinal: string;

  @Property() public readonly recordID: string;
  @Property() public readonly saleStatus: string;

  @Property() public readonly clawbackNotes: string;

  @Property() public readonly repRedline: string;

  @Property() public readonly repRedlineOverrride: string;
  @Property() public readonly leadgenRedlineOverrride: string;

  @Property() public readonly salesRep: string;
  @Property() public readonly ppwFinal: string; // Change to match the type you need
  @Property() public readonly status: string; // Change to match the type you need
  @Property() public readonly milestone: string;
  @Property() public readonly datePaid: string;
  @Property() public readonly amount: string; // Change to match the type you need
}

export class PlannerResultModel {
  @Property() public readonly _id: string;
  @Property() public readonly title: string;
  @Property() @Enum(SocialAction) public readonly action: SocialAction;
  @Property() public readonly description: string;
  @Property() public readonly startDate: string;
  @Property() public readonly endDate: string;
  @Property() public readonly timeOfExecution: string;
  @Property() public readonly adminId: string;
  @Property() public readonly categoryId: string;
}

export class AvailabilityResultModel {
  @Property() public readonly _id: string;
  @Property() public readonly startDate: string;
  @Property() public readonly endDate: string;
  @Property() public readonly adminId: string;
}

export class RoleResultModel {
  @Property() public readonly _id: string;
  @Property() public readonly name: string;
}

export class SaleRefResultModel {
  @Property() public readonly _id: string;
  @Property() public readonly adminId: string;
  @Property() public readonly score: number;
  @Property() public readonly leads: string[];
  @Property() public readonly createdAt: Date;
  @Property() public readonly updatedAt: Date;
}

export class PayrollItemModel {
  @Property() public readonly techId: string;
  @Property() public readonly allocationPct: number;
  @Property() public readonly paid: boolean;
  @Property() public readonly amountDue: number;
}

@Model()
export class AccountsByProjectResultModel {
  @Property() public readonly projectId: string;
  @Property() public readonly projectName: string;
  @Property() public readonly status: string;
  @ArrayOf(PayrollItemModel) // Change to use ArrayOf instead of CollectionOf
  public readonly payroll: PayrollItemModel[];
}
