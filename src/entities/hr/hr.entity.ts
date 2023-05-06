import {Entity, Column, BaseEntity, PrimaryGeneratedColumn} from 'typeorm';
import { hrInterface } from '../types/hr';
import { IsInt, Length, Min, Max } from 'class-validator';

@Entity('hr')
export class Hr extends BaseEntity implements hrInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  @Length(3, 255, {
    message: '$property: Minimal length is $constraint1 characters and maximal lenght is $constraint2, but actual is $value.'
  })
  fullName: string;

  @Column({ type: 'varchar', length: 255 })
  @Length(3, 255, {
    message: '$property: Minimal length is $constraint1 characters and maximal lenght is $constraint2, but actual is $value.'
  })
  company: string;

  @Column({ type: 'smallint' })
  @IsInt()
  @Min(1, {
    message: '$property: Minimal value is $constraint1.'
  })
  @Max(999, {
    message: '$property: Maximal value is $constraint1.'
  })
  maxReservedStudents: number;
}
