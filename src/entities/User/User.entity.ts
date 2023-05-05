import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn } from 'typeorm'
import { UserInterface } from '../types/User';
import { Roles } from '../types/Roles';
import { Contains, IsEnum } from 'class-validator';
import { StudentsData } from '../studentsData/studentsData.entity';
import { StudentsRating } from '../studentsRating/studentsRating.entity';
import { Hr } from '../hr/hr.entity';
import { UserActive } from '../../../types';

@Entity()
export class User extends BaseEntity implements UserInterface {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: "varchar", length: 100, unique: true })
    @Contains('@', {
        message: '$property: Is wrong.',
    })
    email: string

    @Column({ type: "varchar", length: 100 })
    password: string

    @Column({ type: "varchar", length: 512, unique: true, nullable: true })
    token: string | null

    @Column({ type: "varchar", length: 512, unique: true, nullable: true })
    registerToken: string | null

    @Column({ type: 'enum', enum: Roles })
    @IsEnum(Roles)
    role: Roles

    @Column({type: 'enum', enum: UserActive, default: UserActive.NOT_ACTIVE })
    @IsEnum(UserActive)
    isActive: UserActive

    @OneToOne(() => StudentsData)
    @JoinColumn()
    studentsData: StudentsData

    @OneToOne(() => StudentsRating)
    @JoinColumn()
    studentsRating: StudentsRating

    @OneToOne(() => Hr)
    @JoinColumn()
    hr: Hr
}