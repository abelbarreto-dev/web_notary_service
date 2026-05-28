import { PrismaContext } from "@infra/prisma.context";
import { NotaryId, NotaryInput } from "@infra/notary.models";
import { NotaryController } from "../../controllers/notary.controller";

export const notaryResolvers = {
    Query: {
        findAllNotaries: async (
            _: any,
            notary: any,
            context: PrismaContext,
        ) => {
            const controller = new NotaryController(context.prisma);
        },
    },

    Mutation: {
        createNotary: async (
            _: any,
            notary: NotaryInput,
            context: PrismaContext,
        ) => {
            const controller = new NotaryController(context.prisma);
        },
        updateNotary: async (
            _: any,
            notary: NotaryInput,
            context: PrismaContext,
        ) => {
            const controller = new NotaryController(context.prisma);
        },
        deleteNotary: async (
            _: any,
            notary: NotaryId,
            context: PrismaContext,
        ) => {
            const controller = new NotaryController(context.prisma);
        },
    },
};
