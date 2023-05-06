import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm'
import { ToTalkInterface } from '../types/toTalk';
import { User } from '../User/User.entity';

@Entity()
export class ToTalk extends BaseEntity implements ToTalkInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 36 })
  hrId: string;

  @Column({ type: 'date' })
  toDate: Date;

  @ManyToOne(() => User, (user) => user.toTalk)
  students: User;
}