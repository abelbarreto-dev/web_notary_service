import type { UserRole } from "../../../enums/enums.ts";

export type UserInput = {
    id?: string;
    name: string;
    email: string;
    password: string;
    profile: UserRole;
};

export type UserId = { id: string };
