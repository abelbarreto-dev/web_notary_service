import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { Express } from "express";
import { PrismaClient } from "../../../prisma/client/client";
import {
    closeDatabase,
    prismaTest,
    setupDatabase,
} from "@test/infra/setup/setup.database";
import { startServerGraphQL } from "@graphql-pkg/server";
import request from "supertest";
import { makeNotaryMocked } from "@test/mocks/notary.mocked";
import { NotaryStatus, NotaryType } from "@infra/enums/enums";

describe("GraphQL Notary Tests", () => {
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

    const notaryMocked = makeNotaryMocked({});
    let notaryId = "";

    test("creating notary successfully", async () => {
        const mutation = `
        mutation Mutation($data: NotaryInput!) {
            createNotary(notary: $data) {
                success
                message
                data {
                    id
                    applicant
                    cpf
                    description
                    requestDate
                    remarks
                    notaryStatus
                    notaryType
                    createdAt
                    updatedAt
                }
            }
        }
        `;

        const notaryData = {
            data: {
                ...notaryMocked,
                notaryStatus: NotaryStatus[notaryMocked.notaryStatus],
                notaryType: NotaryType[notaryMocked.notaryType],
            },
        };

        const response = await request(app).post("/graphql").send({
            query: mutation,
            variables: notaryData,
        });

        expect(response.status).toBe(200);

        const body = response.body.data.createNotary;
        notaryId = body.data.id;

        expect(body.success).toBe(true);
        expect(body.data.applicant).toEqual(notaryData.data.applicant);
    });

    test("finding all notaries successfully", async () => {
        const query = `
        query {
            findAllNotaries {
                success
                message
                data {
                    id
                    applicant
                    cpf
                    description
                    requestDate
                    remarks
                    notaryStatus
                    notaryType
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

        console.log(response.body.data);

        const body = response.body.data.findAllNotaries;

        expect(body.data).toHaveLength(1);
    });

    test("notary update successfully", async () => {
        const mutation = `
        mutation Mutation($data: NotaryInput!) {
            updateNotary(notary: $data) {
                success
                message
                data {
                    id
                    applicant
                    cpf
                    description
                    requestDate
                    remarks
                    notaryStatus
                    notaryType
                    createdAt
                    updatedAt
                }
            }
        }
        `;

        const notaryData = {
            data: {
                ...notaryMocked,
                id: notaryId,
                applicant: "Cristiano Ronaldo",
                notaryStatus: NotaryStatus[notaryMocked.notaryStatus],
                notaryType: NotaryType.DEED,
            },
        };

        const response = await request(app).post("/graphql").send({
            query: mutation,
            variables: notaryData,
        });

        expect(response.status).toBe(200);

        const body = response.body.data.updateNotary;

        expect(body.success).toBe(true);
        expect(body.data.applicant).toEqual(notaryData.data.applicant);
    });

    test("notary delete successfully", async () => {
        const mutation = `
        mutation Mutation($data: NotaryId!) {
            deleteNotary(notary: $data) {
                success
                message
                data {
                    id
                    applicant
                    cpf
                    description
                    requestDate
                    remarks
                    notaryStatus
                    notaryType
                    createdAt
                    updatedAt
                }
            }
        }
        `;

        const notaryData = {
            data: { id: notaryId },
        };

        const response = await request(app).post("/graphql").send({
            query: mutation,
            variables: notaryData,
        });

        expect(response.status).toBe(200);

        const body = response.body.data.deleteNotary;

        expect(body.success).toBe(true);
        expect(body.data.cpf).toEqual(notaryMocked.cpf);
    });
});
