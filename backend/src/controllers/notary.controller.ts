import { NotaryService } from "@services/notary.service";
import { PrismaClient } from "../../prisma/client/client";
import { NotaryId, NotaryInput } from "@infra/notary.models";

export class NotaryController {
    private notaryService: NotaryService;

    constructor(private readonly prismaClient: PrismaClient) {
        this.notaryService = new NotaryService(prismaClient);
    }

    async createNotary(notary: NotaryInput) {}

    async findAllNotaries() {}

    async updateNotary(notary: NotaryInput) {}

    async deleteNotary(notaryId: NotaryId) {}
}
