import { PrismaClient } from "../../prisma/client/client";

export class UserRepository {
    private prisma: PrismaClient;

    constructor(private readonly prismaClient: PrismaClient) {
        this.prisma = prismaClient;
    }

    async createUser() {}

    async findAllUsers() {}

    async updateUser() {}

    async deleteUser() {}

    async singInUser() {}
}
