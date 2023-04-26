import { Entity, Column, BaseEntity, PrimaryColumn } from 'typeorm';
import { StudnetsRating } from '../types/studentsRating';

@Entity('students_rating')
export class StudentsRating extends BaseEntity implements StudnetsRating {
  @PrimaryColumn()
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