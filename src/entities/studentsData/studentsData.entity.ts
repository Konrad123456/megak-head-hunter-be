import { Entity, Column, BaseEntity, PrimaryColumn } from 'typeorm';
import { ContractType, StudentStatus, StudentsDataInterface, choiceYesNO, expectedTypeWorkEntity } from '../types/studentsData';

@Entity('students_data')
export class StudentsData extends BaseEntity implements StudentsDataInterface {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'char', length: 12 })
  tel: string;

  @Column({ type: 'char', length: 50 })
  firstName: string;

  @Column({ type: 'char', length: 50 })
  lastName: string;

  @Column({ type: 'char', length: 255 })
  githubUsername: string;

  @Column({ type: 'simple-array' })
  portfolioUrls: string[];

  @Column({ type: 'simple-array' })
  projectUrls: string[];

  @Column({ type: 'mediumtext' })
  bio: string;

  @Column({ type: 'enum', enum: expectedTypeWorkEntity, default: expectedTypeWorkEntity.Irrelavant })
  expectedTypeWork: expectedTypeWorkEntity;

  @Column({ type: 'char', length: 255 })
  targetWorkCity: string;

  @Column({ type: 'enum', enum: ContractType, default: ContractType.NoPreference })
  expectedContractType: ContractType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  expectedSalary: number;

  @Column({ type: 'enum', enum: choiceYesNO, default: choiceYesNO.No })
  canTakeApprenticeship: choiceYesNO;

  @Column({ type: 'tinyint', length: 4, default: 0 })
  monthsOfCommercialExp: number

  @Column({ type: 'tinyint', length: 3 })
  education: string;

  @Column({ type: 'text' })
  workExperience: string;

  @Column({ type: 'text' })
  courses: string;

  @Column({ type: 'enum', enum: StudentStatus, default:  })
  status: StudentStatus;
}