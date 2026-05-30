import { NotaryRepository } from "@repositories/notary.repository";
import { Notary, PrismaClient } from "../../prisma/client/client";
import { NotaryId, NotaryInput } from "@infra/models/notary.models";
import {
    validateNotaryCreateOrUpdate,
    validateNotaryId,
} from "../utils/validators/notary.validator";

export class NotaryService {
    private notaryRepository: NotaryRepository;

    constructor(private readonly prismaClient: PrismaClient) {
        this.notaryRepository = new NotaryRepository(prismaClient);
    }

    async createNotary(notary: NotaryInput): Promise<Notary> {
        await validateNotaryCreateOrUpdate(notary);

        return await this.notaryRepository.createNotary(notary);
    }

    async findAllNotaries(): Promise<Notary[]> {
        return await this.notaryRepository.findAllNotaries();
    }

    async updateNotary(notary: NotaryInput): Promise<Notary> {
        await validateNotaryCreateOrUpdate(notary);

        return await this.notaryRepository.updateNotary(notary);
    }

    async deleteNotary(notaryId: NotaryId): Promise<Notary> {
        await validateNotaryId(notaryId);

        return await this.notaryRepository.deleteNotary(notaryId);
    }
}
