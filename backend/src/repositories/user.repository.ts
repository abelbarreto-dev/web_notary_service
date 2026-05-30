import { PrismaClient, User } from "../../prisma/client/client";
import { UserId, UserInput, UserLogin } from "@infra/models/user.models";
import { DatabaseException } from "@exception/database.exception";
import { UserException } from "@exception/user.exception";

export class UserRepository {
    private prisma: PrismaClient;

    constructor(private readonly prismaClient: PrismaClient) {
        this.prisma = prismaClient;
    }

    async createUser(user: UserInput): Promise<User> {
        try {
            return await this.prisma.$transaction(async () => {
                return this.prisma.user.create({ data: user });
            });
        } catch (error) {
            console.error(error);

            throw new DatabaseException("process.database.user.createFailed");
        }
    }

    async findAllUsers(): Promise<User[]> {
        try {
            return await this.prisma.user.findMany();
        } catch (error) {
            console.error(error);

            throw new DatabaseException("process.database.user.findAllFailed");
        }
    }

    async updateUser(user: UserInput): Promise<User> {
        try {
            return await this.prisma.$transaction(async () => {
                const dbUser = await this.prisma.user.findUniqueOrThrow({
                    where: { id: user.id },
                });

                const userData = {
                    id: dbUser.id,
                    name: user.name,
                    email: user.email,
                    profile: user.profile,
                };

                return this.prisma.user.update({
                    data: userData,
                    where: { id: userData.id },
                });
            });
        } catch (error) {
            console.error(error);
            throw new UserException({
                name: "UserException",
                message: "user update failed",
                code: 422,
                cause: "the user update has failed because user not found or invalid fields",
                stack: "process.database.user.updateFailed",
            });
        }
    }

    async deleteUser(user: UserId): Promise<User> {
        try {
            return await this.prisma.$transaction(async () => {
                return this.prisma.user.delete({ where: { id: user.id } });
            });
        } catch (error) {
            console.error(error);

            throw new DatabaseException("process.database.user.deletedFailed");
        }
    }

    async signInUser(user: UserLogin): Promise<User> {
        try {
            return await this.prisma.$transaction(async () => {
                return this.prisma.user.findUniqueOrThrow({
                    where: { email: user.email },
                });
            });
        } catch (error) {
            console.error(error);
            throw new UserException({
                name: "UserException",
                message: "user login failed",
                code: 404,
                cause: "the user sign in has failed because user not found for this email",
                stack: "process.database.user.singInFailed",
            });
        }
    }
}
