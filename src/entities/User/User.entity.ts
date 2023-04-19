import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"
import { UserInterface } from "../types/User";
import {Roles} from "../types/Roles";

@Entity()
export class User extends BaseEntity implements UserInterface {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: "varchar", length: 100, unique: true })
    email: string

    @Column({ type: "varchar", length: 100 })
    password: string

    @Column({ type: "varchar", length: 512, unique: true })
    token: string

    @Column({ type: "varchar", length: 36, unique: true })
    registerToken: string

    @Column({ type: 'enum', enum: Roles, default: Roles.STUDENT })
    role: Roles
}