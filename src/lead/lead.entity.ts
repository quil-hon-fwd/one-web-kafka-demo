import { CreateLeadDto } from "./dto/create-lead.dto";

export class Lead {
  constructor(lead: CreateLeadDto) {
    this.id = lead.id;
    this.applicationId = lead.applicationId;
    this.lastUpdated = lead.lastUpdated;
    this.planCode = lead.planCode;
    this.dropOffStep = lead.dropOffStep;
    this.dropOffReason = lead.dropOffReason;
    this.firstNameKanji = lead.firstNameKanji;
    this.lastNameKanji = lead.lastNameKanji;
    this.firstNameKana = lead.firstNameKana;
    this.lastNameKana = lead.lastNameKana;
    this.email = lead.email;
    this.phoneNumber = lead.phoneNumber;
    this.postcode = lead.postcode;
    this.prefecture = lead.prefecture;
    this.address = lead.address;
    this.apartment = lead.apartment;
    this.occupationClass1 = lead.occupationClass1;
    this.occupationClass2 = lead.occupationClass2;
    this.occupationClass3 = lead.occupationClass3;
    this.jobCode = lead.jobCode;
    this.gender = lead.gender;
    this.dateOfBirth = lead.dateOfBirth;
    this.deputyClaimantRelationship = lead.deputyClaimantRelationship;
    this.designatedDeputyClaimantFirstName = lead.designatedDeputyClaimantFirstName;
    this.designatedDeputyClaimantLastName = lead.designatedDeputyClaimantLastName;
    this.marketingAcceptance = lead.marketingAcceptance;
    this.eidai = lead.eidai;
    this.campaignCode = lead.campaignCode;
    this.defaultPlan = lead.defaultPlan;
    this.utmSource = lead.utmSource;
    this.utmMedium = lead.utmMedium;
    this.utmCampaign = lead.utmCampaign;
    this.utmTerm = lead.utmTerm;
    this.utmContent = lead.utmContent;
  }

  id: string;
  applicationId: string;
  lastUpdated: string;
  planCode: string;
  dropOffStep: string;
  dropOffReason: string;
  firstNameKanji: string;
  lastNameKanji: string;
  firstNameKana: string;
  lastNameKana: string;
  email: string;
  phoneNumber: string;
  postcode: string;
  prefecture: string;
  address: string;
  apartment: string;
  occupationClass1: string;
  occupationClass2: string;
  occupationClass3: string;
  jobCode: string;
  gender: string;
  dateOfBirth: string;
  deputyClaimantRelationship: string;
  designatedDeputyClaimantFirstName: string;
  designatedDeputyClaimantLastName: string;
  marketingAcceptance: boolean;
  eidai: string;
  campaignCode: string;
  defaultPlan: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
}