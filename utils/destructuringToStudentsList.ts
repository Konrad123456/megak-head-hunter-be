import { ContractType, choiceYesNO, expectedTypeWorkEntity } from "../src/entities/types/studentsData";
import { StudentsList } from "../types";

export class DestructuringToStudentsList implements StudentsList {
  id: string;
  email: string;
  courseCompletion: number;
  courseEngagment: number;
  projectDegree: number;
  teamProjectDegree: number;
  targetWorkCity: string;
  firstName: string;
  lastName: string;
  expectedTypeWork: expectedTypeWorkEntity;
  expectedContractType: ContractType;
  expectedSalary: number;
  canTakeApprenticeship: choiceYesNO;
  monthsOfCommercialExp: number;

  constructor(obj: any) {
    this.id= obj.id;
    this.email= obj.email;
    this.courseCompletion= obj.courseCompletion;
    this.courseEngagment= obj.courseEngagment;
    this.projectDegree= obj.projectDegree;
    this.teamProjectDegree= obj.teamProjectDegree;
    this.targetWorkCity= obj.targetWorkCity;
    this.firstName= obj.firstName;
    this.lastName= obj.lastName;
    this.expectedTypeWork= obj.expectedTypeWork;
    this.expectedContractType= obj.expectedContractType;
    this.expectedSalary= obj.expectedSalary;
    this.canTakeApprenticeship= obj.canTakeApprenticeship;
    this.monthsOfCommercialExp= obj.monthsOfCommercialExp;
  }

  returnData = () => this;
} 
