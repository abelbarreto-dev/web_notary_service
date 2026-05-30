import { PrismaContext } from "@infra/contexts/prisma.context";
import { NotaryId, NotaryInput } from "@infra/models/notary.models";
import { NotaryController } from "../../controllers/notary.controller";
import { Models } from "@infra/models/models";
import { layerResponseWrapper } from "@infra/wrappers/response.wrapper";

export const notaryResolvers = {
    Query: {
        findAllNotaries: layerResponseWrapper(
            async (_: any, context: PrismaContext) => {
                const controller = new NotaryController(context.prisma);

                return controller.findAllNotaries();
            },
        ),
    },

    Mutation: {
        createNotary: layerResponseWrapper(
            async (
                _: any,
                notary: Models<NotaryInput>,
                context: PrismaContext,
            ) => {
                const controller = new NotaryController(context.prisma);

                return await controller.createNotary(notary.data);
            },
        ),
        updateNotary: layerResponseWrapper(
            async (
                _: any,
                notary: Models<NotaryInput>,
                context: PrismaContext,
            ) => {
                const controller = new NotaryController(context.prisma);

                return await controller.updateNotary(notary.data);
            },
        ),
        deleteNotary: layerResponseWrapper(
            async (
                _: any,
                notary: Models<NotaryId>,
                context: PrismaContext,
            ) => {
                const controller = new NotaryController(context.prisma);

                return await controller.deleteNotary(notary.data);
            },
        ),
    },
};
