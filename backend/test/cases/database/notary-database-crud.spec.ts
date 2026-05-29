import {
    closeDatabase,
    prismaTest,
    setupDatabase,
} from "@test/infra/setup/setup.database";
import { afterAll, beforeAll, expect, test, describe } from "@jest/globals";
import { notaryCleaner } from "../../infra/cleaners/notaryCleaner";
import { makeNotaryMocked } from "@test/mocks/notary.mocked";

describe("Notary Database CRUD", () => {
    const prisma = prismaTest();

    beforeAll(async () => {
        await setupDatabase();
    });

    test("Create New Notary", async () => {
        const notary = makeNotaryMocked({ notaryStatus: "PENDING" });

        const result = await prisma.notary.create({ data: { ...notary } });

        const validate = {
            ...notary,
            id: result.id,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
        };

        if (!result.remarks) {
            validate.remarks = null;
        }

        expect(validate).toEqual(result);
    });

    afterAll(async () => {
        await notaryCleaner();
        await closeDatabase();
    });
});
