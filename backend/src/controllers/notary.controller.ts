import { PrismaClient } from "@prisma/client/client";
import { NotaryService } from "@services/notary.service";

export class NotaryController {
    private notaryService: NotaryService;

    constructor(private readonly prismaClient: PrismaClient) {
        this.notaryService = new NotaryService(prismaClient);
    }

    async createNotary() {}

    async findAllNotaries() {}

    async updateNotary() {}

    async deleteNotary() {}
}
