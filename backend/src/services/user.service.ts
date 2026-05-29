import { UserRepository } from "@repositories/user.repository";
import { PrismaClient, User } from "../../prisma/client/client";
import { UserId, UserInput, UserLogin } from "@infra/user.models";

export class UserService {
    private userRepository: UserRepository;

    constructor(private readonly prismaClient: PrismaClient) {
        this.userRepository = new UserRepository(prismaClient);
    }

    async createUser(user: UserInput): Promise<User> {}

    async findAllUsers(): Promise<User[]> {}

    async updateUser(user: UserInput): Promise<User> {}

    async deleteUser(user: UserId): Promise<User> {}

    async singInUser(user: UserLogin): Promise<User> {}
}
