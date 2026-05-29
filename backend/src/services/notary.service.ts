import { NotaryRepository } from "@repositories/notary.repository";
import { Notary, PrismaClient } from "../../prisma/client/client";
import { NotaryId, NotaryInput } from "@infra/notary.models";

export class NotaryService {
    private notaryRepository: NotaryRepository;

    constructor(private readonly prismaClient: PrismaClient) {
        this.notaryRepository = new NotaryRepository(prismaClient);
    }

    async createNotary(notary: NotaryInput): Promise<Notary> {}

    async findAllNotaries(): Promise<Notary[]> {}

    async updateNotary(notary: NotaryInput): Promise<Notary> {}

    async deleteNotary(notaryId: NotaryId): Promise<Notary> {}
}
