import { StudentsRating } from '../src/entities/studentsRating/studentsRating.entity';
import { UserInterface } from '../src/entities/types/User';
import { StudentsDataInterface } from '../src/entities/types/studentsData';
import { StudnetsRatingInterface } from '../src/entities/types/studentsRating';
import { TokenResponse } from './token.types';

// REGISTER
export type UserRegiserData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type UserRegiserResponse = {
  messege: string;
}

// LOGIN
export type UserLogin = {
  email: string;
  password: string;
}

export type UserLoginResponse = TokenResponse;

// VIEW - STUDENTS LIST
type OmitPropertyOfUser = 'password' | 'token' | 'registerToken' | 'role' | 'bonusProjectUrls';

export type StudentsList = Omit<
  UserInterface & StudnetsRatingInterface,
  OmitPropertyOfUser
>
  & Pick<StudentsDataInterface,
    'targetWorkCity' |
    'firstName' |
    'lastName' |
    'expectedTypeWork' |
    'expectedContractType' |
    'expectedSalary' |
    'canTakeApprenticeship' |
    'monthsOfCommercialExp'
  >;

export type StudentsListResponse = Readonly<StudentsList[]>;

// VIEW - STUDENET CV
export type StudentsCVResponse = Omit<UserInterface & StudnetsRatingInterface & StudentsDataInterface, OmitPropertyOfUser>;

// VIEW - One student view
export type OneStudentResponse = Omit<StudentsDataInterface, "id" | "status"> & Pick<UserInterface, "email">;

export type StudentsToTalkList = StudentsList & Pick<StudentsDataInterface, 'githubUsername' | 'firstName' | 'lastName'>;

// VIEW STUDETS TO TALK
export type StudntsToTalkListResposne = StudentsToTalkList[];

export enum expectedTypeWorkEntity {
  IRRELEVANT,
  ATLOCATIION,
  REDY_TO_CARRYOUT,
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

export type ChangePasswordRequest = {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

export enum UserActive {
  NOT_ACTIVE,
  ACTIVE,
}