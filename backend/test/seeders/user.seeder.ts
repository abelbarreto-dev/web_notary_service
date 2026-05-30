import { prismaTest } from "@test/infra/setup/setup.database";
import { makeUserMocked } from "@test/mocks/user.mocked";
import { UserRole } from "@infra/enums/enums";
import { DatabaseException } from "@exception/database.exception";

export async function seedOneUserAndGetId(): Promise<string> {
    const prisma = prismaTest();

    const userMocked = makeUserMocked({});

    const user = {
        ...userMocked,
        profile: UserRole[userMocked.profile],
    };

    try {
        return await prisma.$transaction(async () => {
            const u = await prisma.user.create({ data: user });

            return u.id;
        });
    } catch (error) {
        throw new DatabaseException("process.user.seedOneUser");
    }
}
