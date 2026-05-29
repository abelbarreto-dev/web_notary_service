import { PrismaClient, User } from "../../prisma/client/client";
import { UserId, UserInput, UserLogin } from "@infra/user.models";

export class UserRepository {
    private prisma: PrismaClient;

    constructor(private readonly prismaClient: PrismaClient) {
        this.prisma = prismaClient;
    }

    async createUser(user: UserInput): Promise<User> {}

    async findAllUsers(): Promise<User[]> {}

    async updateUser(user: UserInput): Promise<User> {}

    async deleteUser(user: UserId): Promise<User> {}

    async singInUser(user: UserLogin): Promise<User> {}
}
