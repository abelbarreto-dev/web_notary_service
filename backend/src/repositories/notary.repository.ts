import { PrismaClient } from "../../prisma/client/client";
import { NotaryId, NotaryInput } from "@infra/notary.models";

export class NotaryRepository {
    private prisma: PrismaClient;

    constructor(private readonly prismaClient: PrismaClient) {
        this.prisma = prismaClient;
    }

    async createNotary(notary: NotaryInput) {}

    async findAllNotaries() {}

    async updateNotary(notary: NotaryInput) {}

    async deleteNotary(notaryId: NotaryId) {}
}
