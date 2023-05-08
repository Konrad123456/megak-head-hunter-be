import { Roles } from "./Roles";

export interface UserInterface {
    id: string;
    email: string;
    password: string;
    token: string | null;
    registerToken: string | null;
    role: Roles;
}