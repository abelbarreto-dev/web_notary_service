import { NotaryService } from "@services/notary.service";
import { PrismaClient } from "../../prisma/client/client";
import { NotaryId, NotaryInput } from "@infra/models/notary.models";
import { notaryResponseFactory } from "../utils/factories/notary.response.factory";
import { UserId } from "@infra/models/user.models";

export class NotaryController {
    private notaryService: NotaryService;

    constructor(private readonly prismaClient: PrismaClient) {
        this.notaryService = new NotaryService(prismaClient);
    }

    async createNotary(notary: NotaryInput) {
        const notaryDB = await this.notaryService.createNotary(notary);

        return await notaryResponseFactory(notaryDB);
    }

    async findAllNotaries(user: UserId) {
        return await this.notaryService.findAllNotaries(user);
    }

    async updateNotary(notary: NotaryInput) {
        const notaryDB = await this.notaryService.updateNotary(notary);

        return await notaryResponseFactory(notaryDB);
    }

    async deleteNotary(notaryId: NotaryId) {
        const notaryDB = await this.notaryService.deleteNotary(notaryId);

        return await notaryResponseFactory(notaryDB);
    }
}
