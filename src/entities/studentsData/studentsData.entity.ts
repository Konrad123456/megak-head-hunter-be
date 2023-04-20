import { Entity, Column, BaseEntity, PrimaryColumn } from 'typeorm';
import { ContractType, StudentStatus, StudentsDataInterface, choiceYesNO, expectedTypeWorkEntity } from '../types/studentsData';

@Entity('students_data')
export class StudentsData extends BaseEntity implements StudentsDataInterface {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 12, nullable: true })
  tel: string;

  @Column({ type: 'varchar', length: 50 })
  firstName: string;

  @Column({ type: 'varchar', length: 50 })
  lastName: string;

  @Column({ type: 'varchar', length: 255 })
  githubUsername: string;

  @Column({ type: 'simple-array', nullable: true })
  portfolioUrls: string[];

  @Column({ type: 'simple-array' })
  projectUrls: string[];

  @Column({ type: 'mediumtext' })
  bio: string;

  @Column({ type: 'enum', enum: expectedTypeWorkEntity, default: expectedTypeWorkEntity.Irrelavant, nullable: true })
  expectedTypeWork: expectedTypeWorkEntity;

  @Column({ type: 'varchar', length: 255, nullable: true })
  targetWorkCity: string;

  @Column({ type: 'enum', enum: ContractType, default: ContractType.NoPreference })
  expectedContractType: ContractType;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  expectedSalary: number;

  @Column({ type: 'enum', enum: choiceYesNO, default: choiceYesNO.No })
  canTakeApprenticeship: choiceYesNO;

  @Column({ type: 'tinyint', length: 4, default: 0 })
  monthsOfCommercialExp: number

  @Column({ type: 'text', nullable: true })
  education: string;

  @Column({ type: 'text', nullable: true })
  workExperience: string;

  @Column({ type: 'text', nullable: true })
  courses: string;

  @Column({ type: 'enum', enum: StudentStatus, default: StudentStatus.Available })
  status: StudentStatus;
}