import { UserRepository } from "@repositories/user.repository";
import { PrismaClient } from "../../prisma/client/client";
import { UserId, UserInput, UserLogin } from "@infra/user.models";

export class UserService {
    private userRepository: UserRepository;

    constructor(private readonly prismaClient: PrismaClient) {
        this.userRepository = new UserRepository(prismaClient);
    }

    async createUser(user: UserInput) {}

    async findAllUsers() {}

    async updateUser(user: UserInput) {}

    async deleteUser(user: UserId) {}

    async singInUser(user: UserLogin) {}
}
