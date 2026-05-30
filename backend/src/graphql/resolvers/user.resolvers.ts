import { PrismaContext } from "@infra/contexts/prisma.context";
import { UserId, UserInput, UserLogin } from "@infra/models/user.models";
import { UserController } from "../../controllers/user.controller";
import { ModelUser } from "@infra/models/models";
import { layerResponseWrapper } from "@infra/wrappers/response.wrapper";

export const userResolvers = {
    Query: {
        findAllUsers: layerResponseWrapper(
            async (_: any, user: any, context: PrismaContext) => {
                const controller = new UserController(context.prisma);

                return await controller.findAllUsers();
            },
        ),
    },

    Mutation: {
        createUser: layerResponseWrapper(
            async (
                _: any,
                user: ModelUser<UserInput>,
                context: PrismaContext,
            ) => {
                const controller = new UserController(context.prisma);

                return await controller.createUser(user.user);
            },
        ),
        updateUser: layerResponseWrapper(
            async (
                _: any,
                user: ModelUser<UserInput>,
                context: PrismaContext,
            ) => {
                const controller = new UserController(context.prisma);

                return await controller.updateUser(user.user);
            },
        ),
        deleteUser: layerResponseWrapper(
            async (_: any, user: ModelUser<UserId>, context: PrismaContext) => {
                const controller = new UserController(context.prisma);

                return await controller.deleteUser(user.user);
            },
        ),
        signInUser: layerResponseWrapper(
            async (
                _: any,
                user: ModelUser<UserLogin>,
                context: PrismaContext,
            ) => {
                const controller = new UserController(context.prisma);

                return await controller.signInUser(user.user);
            },
        ),
    },
};
