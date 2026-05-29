import {
    closeDatabase,
    prismaTest,
    setupDatabase,
} from "@test/infra/setup/setup.database";
import { afterAll, beforeAll, expect, test, describe } from "@jest/globals";
import { makeUserMocked } from "@test/mocks/user.mocked";
import { userCleaner } from "../../infra/cleaners/userCleaner";

describe("User Database CRUD", () => {
    const prisma = prismaTest();

    beforeAll(async () => {
        await setupDatabase();
    });

    test("Create New Admin User", async () => {
        const admin = makeUserMocked({ profile: "ADMINISTRATOR" });

        const result = await prisma.user.create({ data: { ...admin } });

        expect({
            ...admin,
            id: result.id,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
        }).toEqual(result);
    });

    afterAll(async () => {
        await userCleaner();
        await closeDatabase();
    });
});
