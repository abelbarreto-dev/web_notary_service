import { prismaTest } from "../setup/setup.database";

export async function userCleaner(): Promise<void> {
    const prisma = prismaTest();

    await prisma.$executeRawUnsafe(
        `TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`,
    );
}
