import { PrismaContext } from "@infra/prisma.context";
import { UserId, UserInput, UserLogin } from "@infra/user.models";
import { UserController } from "../../controllers/user.controller";

export const userResolvers = {
    Query: {
        findAllUsers: async (_: any, user: any, context: PrismaContext) => {
            const controller = new UserController(context.prisma);
        },
    },

    Mutation: {
        createUser: async (_: any, user: UserInput, context: PrismaContext) => {
            const controller = new UserController(context.prisma);
        },
        updateUser: async (_: any, user: UserInput, context: PrismaContext) => {
            const controller = new UserController(context.prisma);
        },
        deleteUser: async (_: any, user: UserId, context: PrismaContext) => {
            const controller = new UserController(context.prisma);
        },
        singInUser: async (_: any, user: UserLogin, context: PrismaContext) => {
            const controller = new UserController(context.prisma);
        },
    },
};
