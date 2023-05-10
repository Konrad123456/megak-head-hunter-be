export enum expectedTypeWorkEntity {
  IRRELEVANT,
  ATLOCATIION,
  READY_TO_CARRYOUT,
  ONLY_REMOTELY,
  HYBRID,
}


export enum ContractType {
  NO_PREFERENCE,
  UOP_ONLY,
  B2B_POSSIBLE,
  UZ_UOD_POSSIBLE,
}

export enum choiceYesNO {
  NO,
  YES,
}

export enum StudentStatus {
  AVAILABLE,
  DURING_CONVERSATION,
  HIRED,
}

export interface StudentsDataInterface {
  id: string;
  tel: string;
  firstName: string;
  lastName: string;
  githubUsername: string;
  portfolioUrls: string[];
  projectUrls: string[];
  bio: string;
  expectedTypeWork: expectedTypeWorkEntity;
  targetWorkCity: string;
  expectedContractType: ContractType;
  expectedSalary: number;
  canTakeApprenticeship: choiceYesNO;
  monthsOfCommercialExp: number
  education: string;
  workExperience: string;
  courses: string;
  status: StudentStatus;
}