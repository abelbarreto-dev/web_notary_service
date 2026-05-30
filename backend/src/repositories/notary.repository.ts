import { Notary, PrismaClient } from "../../prisma/client/client";
import { NotaryId, NotaryInput } from "@infra/models/notary.models";
import { DatabaseException } from "@exception/database.exception";
import { NotaryException } from "@exception/notary.exception";
import { UserId } from "@infra/models/user.models";

export class NotaryRepository {
    private prisma: PrismaClient;

    constructor(private readonly prismaClient: PrismaClient) {
        this.prisma = prismaClient;
    }

    async createNotary(notary: NotaryInput): Promise<Notary> {
        try {
            return await this.prisma.$transaction(async () => {
                return this.prisma.notary.create({ data: notary });
            });
        } catch (error) {
            console.error(error);

            throw new DatabaseException("process.database.notary.createFailed");
        }
    }

    async findAllNotaries(user: UserId): Promise<Notary[]> {
        try {
            return await this.prisma.notary.findMany({
                where: { userId: user.id },
            });
        } catch (error) {
            console.error(error);

            throw new DatabaseException(
                "process.database.notary.findAllFailed",
            );
        }
    }

    async updateNotary(notary: NotaryInput): Promise<Notary> {
        try {
            return await this.prisma.$transaction(async () => {
                const dbNotary = await this.prisma.notary.findUniqueOrThrow({
                    where: { id: notary.id },
                });

                const notaryData = {
                    id: dbNotary.id,
                    applicant: notary.applicant,
                    cpf: notary.cpf,
                    description: notary.description,
                    requestDate: notary.requestDate,
                    remarks: notary.remarks,
                    notaryStatus: notary.notaryStatus,
                    notaryType: notary.notaryType,
                };

                return this.prisma.notary.update({
                    data: notaryData,
                    where: { id: notaryData.id },
                });
            });
        } catch (error) {
            console.error(error);
            throw new NotaryException({
                name: "NotaryException",
                message: "notary update failed",
                code: 422,
                cause: "the notary update has failed because notary not found or invalid fields",
                stack: "process.database.notary.updateFailed",
            });
        }
    }

    async deleteNotary(notaryId: NotaryId): Promise<Notary> {
        try {
            return await this.prisma.$transaction(async () => {
                return this.prisma.notary.delete({
                    where: { id: notaryId.id },
                });
            });
        } catch (error) {
            console.error(error);

            throw new DatabaseException(
                "process.database.notary.deletedFailed",
            );
        }
    }
}
