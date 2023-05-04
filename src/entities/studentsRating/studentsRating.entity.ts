import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
import { StudnetsRatingInterface } from '../types/studentsRating';
import { IsInt, Min, Max, IsArray } from 'class-validator';

const optionsMessage = (type: string) => (
  { message: `$property: ${type} value is $constraint1.` }
)

@Entity('students_rating')
export class StudentsRating extends BaseEntity implements StudnetsRatingInterface {
  @PrimaryGeneratedColumn('uuid')
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
}