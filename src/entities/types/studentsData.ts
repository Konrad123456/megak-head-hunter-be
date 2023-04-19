export enum expectedTypeWorkEntity {
  Irrelavant,
  AtLocatiion,
  RedyToCarryOut,
  OnlyRemotely,
  Hybrid,
}

export enum ContractType {
  NoPreference,
  UoP_only,
  B2B_possible,
  UZ_UoD_possible,
}

export enum choiceYesNO {
  No,
  Yes,
}

export enum StudentStatus {
  Available,
  DuringConversation,
  Hired,
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