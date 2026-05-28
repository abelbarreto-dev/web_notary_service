import { NotaryRepository } from "@repositories/notary.repository";
import { PrismaClient } from "../../prisma/client/client";
import { NotaryId, NotaryInput } from "@infra/notary.models";

export class NotaryService {
    private notaryRepository: NotaryRepository;

    constructor(private readonly prismaClient: PrismaClient) {
        this.notaryRepository = new NotaryRepository(prismaClient);
    }

    async createNotary(notary: NotaryInput) {}

    async findAllNotaries() {}

    async updateNotary(notary: NotaryInput) {}

    async deleteNotary(notaryId: NotaryId) {}
}
