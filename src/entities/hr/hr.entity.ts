import { Entity, Column, BaseEntity, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { hrInterface } from '../types/hr';
import { User } from '../User/User.entity';

@Entity('hr')
export class Hr extends BaseEntity implements hrInterface {
  @PrimaryColumn()
  id: string;
  @OneToOne(() => User, { 'cascade': true })
  @JoinColumn({ name: 'id' })
  user: User;

  @Column({ type: 'varchar', length: 255 })
  fullName: string;

  @Column({ type: 'varchar', length: 255 })
  company: string;

  @Column({ type: 'smallint' })
  maxReservedStudents: number;
}
