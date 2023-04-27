import { Entity, Column, BaseEntity, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { StudnetsRating } from '../types/studentsRating';
import { User } from '../User/User.entity';
import { StudentsData } from '../studentsData/studentsData.entity';

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

  @OneToOne(() => User, { 'cascade': true })
  @JoinColumn({ name: 'id' })
  user?: User;

  @OneToOne(() => StudentsData, { 'cascade': true })
  @JoinColumn({ name: 'id' })
  studentsData?: StudentsData;
}