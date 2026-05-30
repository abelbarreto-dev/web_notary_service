import { PrismaContext } from "@infra/contexts/prisma.context";
import { NotaryId, NotaryInput } from "@infra/models/notary.models";
import { NotaryController } from "../../controllers/notary.controller";
import { ModelNotary, ModelUser } from "@infra/models/models";
import { layerResponseWrapper } from "@infra/wrappers/response.wrapper";
import { UserId } from "@infra/models/user.models";

export const notaryResolvers = {
    Query: {
        findAllNotaries: layerResponseWrapper(
            async (
                _: any,
                notary: ModelUser<UserId>,
                context: PrismaContext,
            ) => {
                const controller = new NotaryController(context.prisma);

                return await controller.findAllNotaries(notary.user);
            },
        ),
    },

    Mutation: {
        createNotary: layerResponseWrapper(
            async (
                _: any,
                notary: ModelNotary<NotaryInput>,
                context: PrismaContext,
            ) => {
                const controller = new NotaryController(context.prisma);

                return await controller.createNotary(notary.notary);
            },
        ),
        updateNotary: layerResponseWrapper(
            async (
                _: any,
                notary: ModelNotary<NotaryInput>,
                context: PrismaContext,
            ) => {
                const controller = new NotaryController(context.prisma);

                return await controller.updateNotary(notary.notary);
            },
        ),
        deleteNotary: layerResponseWrapper(
            async (
                _: any,
                notary: ModelNotary<NotaryId>,
                context: PrismaContext,
            ) => {
                const controller = new NotaryController(context.prisma);

                return await controller.deleteNotary(notary.notary);
            },
        ),
    },
};
