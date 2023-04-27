import { Entity, Column, BaseEntity, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { hrInterface } from '../types/hr';
import { User } from '../User/User.entity';
import { IsInt, Length, Min, Max } from 'class-validator';

@Entity('hr')
export class Hr extends BaseEntity implements hrInterface {
  @PrimaryColumn()
  id: string;
  @OneToOne(() => User, { 'cascade': true })
  @JoinColumn({ name: 'id' })
  user: User;

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
