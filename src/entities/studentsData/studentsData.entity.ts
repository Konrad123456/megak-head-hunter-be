import {Entity, Column, BaseEntity, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import { ContractType, StudentStatus, StudentsDataInterface, choiceYesNO, expectedTypeWorkEntity } from '../types/studentsData';
import { MinLength, MaxLength, Max, IsArray, IsEnum } from 'class-validator';

const optionsMessage = (type: string) => (
  { message: `$property: ${type} value is $constraint1.` }
)

@Entity('students_data')
export class StudentsData extends BaseEntity implements StudentsDataInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 12, nullable: true })
  tel: string;

  @Column({ type: 'varchar', length: 50 })
  @MinLength(3, optionsMessage('Minimal'))
  @MaxLength(50, optionsMessage('Maximal'))
  firstName: string;

  @Column({ type: 'varchar', length: 50 })
  @MinLength(3, optionsMessage('Minimal'))
  @MaxLength(50, optionsMessage('Maximal'))
  lastName: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  @MaxLength(255, optionsMessage('Maximal'))
  githubUsername: string;

  @Column({ type: 'simple-array'})
  @IsArray()
  portfolioUrls: string[];

  @Column({ type: 'simple-array'})
  @IsArray()
  projectUrls: string[];

  @Column({ type: 'mediumtext' })
  bio: string;

  @Column({ type: 'enum', enum: expectedTypeWorkEntity, default: expectedTypeWorkEntity.IRRELEVANT, nullable: true })
  @IsEnum(expectedTypeWorkEntity)
  expectedTypeWork: expectedTypeWorkEntity;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @MaxLength(255, optionsMessage('Maximal'))
  targetWorkCity: string;

  @Column({ type: 'enum', enum: ContractType, default: ContractType.NO_PREFERENCE })
  @IsEnum(ContractType)
  expectedContractType: ContractType;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  expectedSalary: number;

  @Column({ type: 'enum', enum: choiceYesNO, default: choiceYesNO.NO })
  @IsEnum(choiceYesNO)
  canTakeApprenticeship: choiceYesNO;

  @Column({ type: 'tinyint', default: 0 })
  @Max(255, optionsMessage('Maximal'))
  monthsOfCommercialExp: number

  @Column({ type: 'text', nullable: true })
  education: string;

  @Column({ type: 'text', nullable: true })
  workExperience: string;

  @Column({ type: 'text', nullable: true })
  courses: string;

  @Column({ type: 'enum', enum: StudentStatus, default: StudentStatus.AVAILABLE })
  @IsEnum(StudentStatus)
  status: StudentStatus;
}