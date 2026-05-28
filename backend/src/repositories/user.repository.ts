import { PrismaClient } from "../../prisma/client/client";
import { UserId, UserInput, UserLogin } from "@infra/user.models";

export class UserRepository {
    private prisma: PrismaClient;

    constructor(private readonly prismaClient: PrismaClient) {
        this.prisma = prismaClient;
    }

    async createUser(user: UserInput) {}

    async findAllUsers() {}

    async updateUser(user: UserInput) {}

    async deleteUser(user: UserId) {}

    async singInUser(user: UserLogin) {}
}
