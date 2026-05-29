import { Notary, PrismaClient } from "../../prisma/client/client";
import { NotaryId, NotaryInput } from "@infra/notary.models";

export class NotaryRepository {
    private prisma: PrismaClient;

    constructor(private readonly prismaClient: PrismaClient) {
        this.prisma = prismaClient;
    }

    async createNotary(notary: NotaryInput): Promise<Notary> {}

    async findAllNotaries(): Promise<Notary[]> {}

    async updateNotary(notary: NotaryInput): Promise<Notary> {}

    async deleteNotary(notaryId: NotaryId): Promise<Notary> {}
}
