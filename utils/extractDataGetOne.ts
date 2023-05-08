import { ContractType, choiceYesNO, expectedTypeWorkEntity } from "../src/entities/types/studentsData";
import { OneStudentResponse } from "../types";

export class ExtractDataGetOne implements OneStudentResponse {
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
  monthsOfCommercialExp: number;
  education: string;
  workExperience: string;
  courses: string;
  email: string;

  constructor(obj: any) {
    this.tel = obj.tel;
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
    this.githubUsername = obj.githubUsername;
    this.portfolioUrls = obj.portfolioUrls;
    this.projectUrls = obj.projectUrls;
    this.bio = obj.bio;
    this.expectedTypeWork = obj.expectedTypeWork;
    this.targetWorkCity = obj.targetWorkCity;
    this.expectedContractType = obj.expectedContractType;
    this.expectedSalary = obj.expectedSalary;
    this.canTakeApprenticeship = obj.canTakeApprenticeship;
    this.monthsOfCommercialExp = obj.monthsOfCommercialExp;
    this.education = obj.education;
    this.workExperience = obj.workExperience;
    this.courses = obj.courses;
    this.email = obj.email;
  }

  returnData = (): OneStudentResponse => this;
} 
