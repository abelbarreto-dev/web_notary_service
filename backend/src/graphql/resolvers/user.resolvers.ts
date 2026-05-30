import { PrismaContext } from "@infra/contexts/prisma.context";
import { UserId, UserInput, UserLogin } from "@infra/models/user.models";
import { UserController } from "../../controllers/user.controller";
import { Models } from "@infra/models/models";
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
            async (_: any, user: Models<UserInput>, context: PrismaContext) => {
                const controller = new UserController(context.prisma);

                return await controller.createUser(user.data);
            },
        ),
        updateUser: layerResponseWrapper(
            async (_: any, user: Models<UserInput>, context: PrismaContext) => {
                const controller = new UserController(context.prisma);

                return await controller.updateUser(user.data);
            },
        ),
        deleteUser: layerResponseWrapper(
            async (_: any, user: Models<UserId>, context: PrismaContext) => {
                const controller = new UserController(context.prisma);

                return await controller.deleteUser(user.data);
            },
        ),
        singInUser: layerResponseWrapper(
            async (_: any, user: Models<UserLogin>, context: PrismaContext) => {
                const controller = new UserController(context.prisma);

                return await controller.singInUser(user.data);
            },
        ),
    },
};
