import request from "supertest";
import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import {
    closeDatabase,
    prismaTest,
    setupDatabase,
} from "@test/infra/setup/setup.database";
import { Express } from "express";
import { PrismaClient } from "../../../prisma/client/client";
import { startServerGraphQL } from "@graphql-pkg/server";
import { makeUserMocked } from "@test/mocks/user.mocked";
import { UserRole } from "@infra/enums/enums";

describe("GraphQL User Tests", () => {
    let app: Express;
    let prisma: PrismaClient;

    beforeAll(async () => {
        await setupDatabase();
        prisma = prismaTest();
        app = await startServerGraphQL(prisma);
    });

    afterAll(async () => {
        await closeDatabase();
    });

    test("User should be able to create a user", async () => {
        const user = makeUserMocked({});

        const mutation = `
        mutation Mutation($data: UserInput!) {
            createUser(user: $data) {
                success
                message
                data {
                    id
                    name
                    email
                    profile
                    createdAt
                    updatedAt
                }
            }
        }
        `;

        const userData = {
            data: { ...user, profile: UserRole[user.profile] },
        };

        const response = await request(app).post("/graphql").send({
            query: mutation,
            variables: userData,
        });

        expect(response.status).toBe(200);

        const body = response.body.data.createUser;

        expect(body.success).toBe(true);
        expect(body.data.name).toEqual(userData.data.name);
    });
});
