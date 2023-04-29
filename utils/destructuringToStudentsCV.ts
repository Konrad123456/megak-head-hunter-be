import { ContractType, StudentStatus, choiceYesNO, expectedTypeWorkEntity } from "../src/entities/types/studentsData";
import { StudentsCVResponse } from "../types";

export class DestructuringToStudentsCV implements StudentsCVResponse {
  id: string;
  email: string;
  courseCompletion: number;
  courseEngagment: number;
  projectDegree: number;
  teamProjectDegree: number;
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
  status: StudentStatus;

  constructor(obj: any) {
    this.id = obj.id;
    this.email = obj.email;
    this.courseCompletion = obj.courseCompletion;
    this.courseEngagment = obj.courseEngagment;
    this.projectDegree = obj.projectDegree;
    this.teamProjectDegree = obj.teamProjectDegree;
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
    this.status = obj.status;
  }

  returnData = (): StudentsCVResponse => this;
} 
