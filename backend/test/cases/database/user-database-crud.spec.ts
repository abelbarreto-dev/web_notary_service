import {
    closeDatabase,
    prismaTest,
    setupDatabase,
} from "../../infra/setup/setupDatabase";
import { afterAll, beforeAll, expect, test, describe } from "@jest/globals";
import { makeUserMocked } from "../../mocks/userMocked";
import { notaryCleaner } from "../../infra/cleaners/notaryCleaner";
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
