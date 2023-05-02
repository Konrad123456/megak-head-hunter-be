import {Entity, Column, BaseEntity, PrimaryGeneratedColumn} from 'typeorm';
import { StudnetsRatingInterface } from '../types/studentsRating';

@Entity('students_rating')
export class StudentsRating extends BaseEntity implements StudnetsRatingInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'tinyint' })
  courseCompletion: number;

  @Column({ type: 'tinyint' })
  courseEngagment: number;

  @Column({ type: 'tinyint' })
  projectDegree: number;

  @Column({ type: 'tinyint' })
  teamProjectDegree: number;

  @Column({ type: 'simple-array' })
  bonusProjectUrls: string[];
}