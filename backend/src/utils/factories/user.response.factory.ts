import { User as UserDB } from "../../../prisma/client/client";
import { User } from "@infra/user.models";
import { UserRole } from "@infra/enums";

export async function userResponseFactory(userDB: UserDB): Promise<User> {
    const profile: UserRole = userDB.profile as UserRole;
    const createdAt: string = userDB.createdAt.toISOString();
    const updatedAt: string | undefined =
        userDB.updatedAt?.toISOString() ?? undefined;

    return {
        id: userDB.id,
        name: userDB.name,
        email: userDB.email,
        profile,
        createdAt,
        updatedAt,
    };
}
