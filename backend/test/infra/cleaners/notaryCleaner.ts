import { prismaTest } from "../setup/setupDatabase";

export async function notaryCleaner(): Promise<void> {
    const prisma = prismaTest();

    await prisma.$executeRawUnsafe(
        `TRUNCATE TABLE "Notary" RESTART IDENTITY CASCADE;`,
    );
}
