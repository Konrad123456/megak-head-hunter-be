import { Entity, Column, BaseEntity, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { StudnetsRating } from '../types/studentsRating';
import { User } from '../User/User.entity';
import { StudentsData } from '../studentsData/studentsData.entity';
import { IsInt, Length, Min, Max, IsArray } from 'class-validator';

const optionsMessage = (type: string) => (
  { message: `$property: ${type} value is $constraint1.` }
)

@Entity('students_rating')
export class StudentsRating extends BaseEntity implements StudnetsRating {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'tinyint' })
  @IsInt()
  @Min(1, optionsMessage('Minimal'))
  @Max(5, optionsMessage('Maximal'))
  courseCompletion: number;

  @Column({ type: 'tinyint' })
  @IsInt()
  @Min(1, optionsMessage('Minimal'))
  @Max(5, optionsMessage('Maximal'))
  courseEngagment: number;

  @Column({ type: 'tinyint' })
  @IsInt()
  @Min(1, optionsMessage('Minimal'))
  @Max(5, optionsMessage('Maximal'))
  projectDegree: number;

  @Column({ type: 'tinyint' })
  @IsInt()
  @Min(1, optionsMessage('Minimal'))
  @Max(5, optionsMessage('Maximal'))
  teamProjectDegree: number;

  @Column({ type: 'simple-array' })
  @IsArray()
  bonusProjectUrls: string[];

  @OneToOne(() => User, { 'cascade': true })
  @JoinColumn({ name: 'id' })
  user?: User;

  @OneToOne(() => StudentsData, { 'cascade': true })
  @JoinColumn({ name: 'id' })
  studentsData?: StudentsData;
}