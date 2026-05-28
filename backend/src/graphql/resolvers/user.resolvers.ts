import { PrismaContext } from "@infra/prisma.context";
import { UserId, UserInput, UserLogin } from "@infra/user.models";
import { UserController } from "../../controllers/user.controller";
import { ModelContext } from "@infra/model.context";

export const userResolvers = {
    Query: {
        findAllUsers: async (_: any, user: any, context: PrismaContext) => {
            const controller = new UserController(context.prisma);

            return await controller.findAllUsers();
        },
    },

    Mutation: {
        createUser: async (
            _: any,
            user: ModelContext<UserInput>,
            context: PrismaContext,
        ) => {
            const controller = new UserController(context.prisma);

            return await controller.createUser(user.data);
        },
        updateUser: async (
            _: any,
            user: ModelContext<UserInput>,
            context: PrismaContext,
        ) => {
            const controller = new UserController(context.prisma);

            return await controller.updateUser(user.data);
        },
        deleteUser: async (
            _: any,
            user: ModelContext<UserId>,
            context: PrismaContext,
        ) => {
            const controller = new UserController(context.prisma);

            return await controller.deleteUser(user.data);
        },
        singInUser: async (
            _: any,
            user: ModelContext<UserLogin>,
            context: PrismaContext,
        ) => {
            const controller = new UserController(context.prisma);

            return await controller.singInUser(user.data);
        },
    },
};
