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

    const user = makeUserMocked({});
    let userId = "";

    test("user should be able to create a user", async () => {
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
        userId = body.data.id;

        expect(body.success).toBe(true);
        expect(body.data.name).toEqual(userData.data.name);
    });

    test("user should be able to find all users", async () => {
        const query = `
        query {
            findAllUsers {
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

        const response = await request(app).post("/graphql").send({
            query: query,
        });

        expect(response.status).toBe(200);

        const body = response.body.data.findAllUsers;

        expect(body.data).toHaveLength(1);
    });

    test("user should be able to update", async () => {
        const mutation = `
        mutation Mutation($data: UserInput!) {
            updateUser(user: $data) {
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
            data: {
                ...user,
                id: userId,
                profile: UserRole.ATTENDANT,
                name: "Paula Oslo",
            },
        };

        const response = await request(app).post("/graphql").send({
            query: mutation,
            variables: userData,
        });

        expect(response.status).toBe(200);

        const body = response.body.data.updateUser;

        expect(body.success).toBe(true);
        expect(body.data.name).toEqual(userData.data.name);
    });

    test("user should be able to sing in", async () => {
        const userLogin = {
            data: {
                email: user.email,
                password: user.password,
            },
        };

        const mutation = `
        mutation Mutation($data: UserLogin!) {
            singInUser(user: $data) {
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

        const response = await request(app).post("/graphql").send({
            query: mutation,
            variables: userLogin,
        });

        expect(response.status).toBe(200);

        const body = response.body.data.singInUser;

        expect(body.success).toBe(true);
        expect(body.data.email).toBe(user.email);
    });

    test("user should be able to delete", async () => {
        const mutation = `
        mutation Mutation($data: UserId!) {
            deleteUser(user: $data) {
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
            data: { id: userId },
        };

        const response = await request(app).post("/graphql").send({
            query: mutation,
            variables: userData,
        });

        expect(response.status).toBe(200);

        const body = response.body.data.deleteUser;

        expect(body.success).toBe(true);
        expect(body.data.email).toEqual(user.email);
    });
});
