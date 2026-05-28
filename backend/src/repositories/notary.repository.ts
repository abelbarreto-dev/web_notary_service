import { PrismaClient } from "@prisma/client/client";

export class NotaryRepository {
    private prisma: PrismaClient;

    constructor(private readonly prismaClient: PrismaClient) {
        this.prisma = prismaClient;
    }

    async createNotary() {}

    async findAllNotaries() {}

    async updateNotary() {}

    async deleteNotary() {}
}
