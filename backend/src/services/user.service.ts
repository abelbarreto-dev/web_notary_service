import { UserRepository } from "@repositories/user.repository";
import { PrismaClient } from "../../prisma/client/client";

export class UserService {
    private userRepository: UserRepository;

    constructor(private readonly prismaClient: PrismaClient) {
        this.userRepository = new UserRepository(prismaClient);
    }

    async createUser() {}

    async findAllUsers() {}

    async updateUser() {}

    async deleteUser() {}

    async singInUser() {}
}
