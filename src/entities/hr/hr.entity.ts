import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn } from 'typeorm';
import { hrInterface } from '../types/hr';

@Entity('hr')
export class Hr extends BaseEntity implements hrInterface {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'string', length: 255, })
  fullName: string;

  @Column({ type: 'string', length: 255, })
  company: string;

  @Column({ type: 'smallint', length: 3, })
  maxReservedStudents: number;
}