import { UserRole } from "../../../enums/enums.ts";

export type User = {
    id: string;
    name: string;
    email: string;
    profile: UserRole;
    createdAt: string;
    updatedAt?: string;
};
