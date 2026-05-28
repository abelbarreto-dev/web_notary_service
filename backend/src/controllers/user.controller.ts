import { UserService } from "@services/user.service";
import { PrismaClient } from "../../prisma/client/client";
import { UserId, UserInput, UserLogin } from "@infra/user.models";

export class UserController {
    private userService: UserService;

    constructor(private readonly prismaClient: PrismaClient) {
        this.userService = new UserService(prismaClient);
    }

    async createUser(user: UserInput) {}

    async findAllUsers() {}

    async updateUser(user: UserInput) {}

    async deleteUser(user: UserId) {}

    async singInUser(user: UserLogin) {}
}
