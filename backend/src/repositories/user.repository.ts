import { PrismaClient, User } from "../../prisma/client/client";
import { UserId, UserInput, UserLogin } from "@infra/models/user.models";
import { DatabaseException } from "@exception/database.exception";
import { UserException } from "@exception/user.exception";

export class UserRepository {
    private prisma: PrismaClient;
    private userException: UserException = new UserException({
        name: "UserException",
        message: "",
        code: 0,
        cause: "",
        stack: "",
    });

    constructor(private readonly prismaClient: PrismaClient) {
        this.prisma = prismaClient;
    }

    async createUser(user: UserInput): Promise<User> {
        try {
            await this.prisma.$connect();

            return await this.prisma.$transaction(async () => {
                return this.prisma.user.create({ data: user });
            });
        } catch (error) {
            console.error(error);

            throw new DatabaseException("process.database.user.createFailed");
        } finally {
            await this.prisma.$disconnect();
        }
    }

    async findAllUsers(): Promise<User[]> {
        try {
            await this.prisma.$connect();

            return await this.prisma.user.findMany();
        } catch (error) {
            console.error(error);

            throw new DatabaseException("process.database.user.findAllFailed");
        } finally {
            await this.prisma.$disconnect();
        }
    }

    async updateUser(user: UserInput): Promise<User> {
        try {
            await this.prisma.$connect();

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
            this.userException.message = "user update failed";
            this.userException.cause =
                "the user update has failed because user not found or invalid fields";
            this.userException.stack = "process.database.user.updateFailed";
            this.userException.code = 422;

            throw this.userException;
        } finally {
            await this.prisma.$disconnect();
        }
    }

    async deleteUser(user: UserId): Promise<User> {
        try {
            await this.prisma.$connect();

            return await this.prisma.$transaction(async () => {
                return this.prisma.user.delete({ where: { id: user.id } });
            });
        } catch (error) {
            console.error(error);

            throw new DatabaseException("process.database.user.deletedFailed");
        } finally {
            await this.prisma.$disconnect();
        }
    }

    async singInUser(user: UserLogin): Promise<User> {
        try {
            await this.prisma.$connect();

            return await this.prisma.$transaction(async () => {
                return this.prisma.user.findUniqueOrThrow({
                    where: { email: user.email },
                });
            });
        } catch (error) {
            console.error(error);
            this.userException.message = "user login failed";
            this.userException.cause =
                "the user sign in has failed because user not found for this email";
            this.userException.stack = "process.database.user.singInFailed";
            this.userException.code = 404;
            throw this.userException;
        } finally {
            await this.prisma.$disconnect();
        }
    }
}
