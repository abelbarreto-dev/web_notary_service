import { UserRole } from "../enums/enums";

export interface UserInput {
    name: string;
    email: string;
    password: string;
    profile: UserRole;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserId {
    id: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    profile: UserRole;
    createdAt: string;
    updatedAt?: string;
}
