import { Entity, Column, BaseEntity, PrimaryColumn } from 'typeorm';
import { StudnetsRating } from '../types/studentsRating';

@Entity('students_rating')
export class StudentsData extends BaseEntity implements StudnetsRating {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'tinyint', length: 1 })
  courseCompletion: number;

  @Column({ type: 'tinyint', length: 1 })
  courseEngagment: number;

  @Column({ type: 'tinyint', length: 1 })
  projectDegree: number;

  @Column({ type: 'tinyint', length: 1 })
  teamProjectDegree: number;

  @Column({ type: 'simple-array' })
  bonusProjectUrls: string[];
}