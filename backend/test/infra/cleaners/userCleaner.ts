import { prismaTest } from "../setup/setupDatabase";

export async function userCleaner(): Promise<void> {
    const prisma = prismaTest();

    await prisma.$executeRawUnsafe(
        `TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`,
    );
}
