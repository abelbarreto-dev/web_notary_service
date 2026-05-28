import { PrismaContext } from "@infra/prisma.context";
import { NotaryId, NotaryInput } from "@infra/notary.models";
import { NotaryController } from "../../controllers/notary.controller";
import { ModelContext } from "@infra/model.context";

export const notaryResolvers = {
    Query: {
        findAllNotaries: async (
            _: any,
            notary: any,
            context: PrismaContext,
        ) => {
            const controller = new NotaryController(context.prisma);

            return controller.findAllNotaries();
        },
    },

    Mutation: {
        createNotary: async (
            _: any,
            notary: ModelContext<NotaryInput>,
            context: PrismaContext,
        ) => {
            const controller = new NotaryController(context.prisma);

            return await controller.createNotary(notary.data);
        },
        updateNotary: async (
            _: any,
            notary: ModelContext<NotaryInput>,
            context: PrismaContext,
        ) => {
            const controller = new NotaryController(context.prisma);

            return await controller.updateNotary(notary.data);
        },
        deleteNotary: async (
            _: any,
            notary: ModelContext<NotaryId>,
            context: PrismaContext,
        ) => {
            const controller = new NotaryController(context.prisma);

            return await controller.deleteNotary(notary.data);
        },
    },
};
