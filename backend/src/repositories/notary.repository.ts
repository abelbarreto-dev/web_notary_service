import { Notary, PrismaClient } from "../../prisma/client/client";
import { NotaryId, NotaryInput } from "@infra/models/notary.models";
import { DatabaseException } from "@exception/database.exception";
import { NotaryException } from "@exception/notary.exception";

export class NotaryRepository {
    private prisma: PrismaClient;
    private notaryException = new NotaryException({
        name: "NotaryException",
        message: "",
        code: 0,
        cause: "",
        stack: "",
    });

    constructor(private readonly prismaClient: PrismaClient) {
        this.prisma = prismaClient;
    }

    async createNotary(notary: NotaryInput): Promise<Notary> {
        try {
            await this.prisma.$connect();

            return await this.prisma.$transaction(async () => {
                return this.prisma.notary.create({ data: notary });
            });
        } catch (error) {
            console.error(error);

            throw new DatabaseException("process.database.notary.createFailed");
        } finally {
            await this.prisma.$disconnect();
        }
    }

    async findAllNotaries(): Promise<Notary[]> {
        try {
            await this.prisma.$connect();

            return await this.prisma.notary.findMany();
        } catch (error) {
            console.error(error);

            throw new DatabaseException(
                "process.database.notary.findAllFailed",
            );
        } finally {
            await this.prisma.$disconnect();
        }
    }

    async updateNotary(notary: NotaryInput): Promise<Notary> {
        try {
            this.notaryException.code = 0;

            await this.prisma.$connect();

            return await this.prisma.$transaction(async () => {
                const dbNotary = await this.prisma.notary
                    .findUniqueOrThrow({
                        where: { id: notary.id ?? "abc123" },
                    })
                    .catch((_) => {
                        this.notaryException.code = 404;
                        throw this.notaryException;
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
            this.notaryException.message = "notary update failed";
            this.notaryException.cause =
                "the notary update has failed because notary not found or invalid fields";
            this.notaryException.stack = "process.database.notary.updateFailed";

            if (this.notaryException.code === 0)
                this.notaryException.code = 422;

            throw this.notaryException;
        } finally {
            await this.prisma.$disconnect();
        }
    }

    async deleteNotary(notaryId: NotaryId): Promise<Notary> {
        try {
            await this.prisma.$connect();

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
        } finally {
            await this.prisma.$disconnect();
        }
    }
}
