import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn } from 'typeorm'
import { UserInterface } from '../types/User';
import { Roles } from '../types/Roles';
import { Contains, IsEnum } from 'class-validator';
import { StudentsRating } from '../studentsRating/studentsRating.entity';
import { UserActive } from '../../../types';
import { Hr } from '../hr/hr.entity';
import { StudentsData } from '../studentsData/studentsData.entity';

@Entity()
export class User extends BaseEntity implements UserInterface {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: "varchar", length: 100, unique: true })
    @Contains('@', {
        message: '$property: Is wrong.',
    })
    email: string;

    @Column({ type: "varchar", length: 100 })
    password: string

    @Column({ type: "varchar", length: 512, unique: true, nullable: true })
    token: string | null;

    @Column({ type: "varchar", length: 512, unique: true, nullable: true })
    registerToken: string | null;

    @Column({ type: 'enum', enum: Roles, default: Roles.STUDENT })
    role: Roles;

    @Column({ type: 'boolean', enum: UserActive, default: UserActive.NOT_ACTIVE })
    @IsEnum(UserActive)
    isActive: boolean;

    @OneToOne(() => StudentsData, { 'cascade': true })
    @JoinColumn({ name: 'id' })
    studentsData: StudentsData;

    @OneToOne(() => StudentsRating, { 'cascade': true })
    @JoinColumn({ name: 'id' })
    studentsRating: StudentsRating;

    @OneToOne(() => Hr, { 'cascade': true })
    @JoinColumn({ name: 'id' })
    hr: Hr;
}