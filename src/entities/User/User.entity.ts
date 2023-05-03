import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn} from "typeorm"
import { UserInterface } from "../types/User";
import { Roles } from "../types/Roles";
import { Contains } from 'class-validator';
import {StudentsRating} from "../studentsRating/studentsRating.entity";

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

    @Column({ type: 'enum', enum: Roles, default: Roles.STUDENT })
    role: Roles

    @OneToOne(() => StudentsRating)
    @JoinColumn()
    studentData: StudentsRating
}