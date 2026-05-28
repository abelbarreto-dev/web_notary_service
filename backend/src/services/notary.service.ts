import { NotaryRepository } from "@repositories/notary.repository";
import { PrismaClient } from "../../prisma/client/client";

export class NotaryService {
    private notaryRepository: NotaryRepository;

    constructor(private readonly prismaClient: PrismaClient) {
        this.notaryRepository = new NotaryRepository(prismaClient);
    }

    async createNotary() {}

    async findAllNotaries() {}

    async updateNotary() {}

    async deleteNotary() {}
}
