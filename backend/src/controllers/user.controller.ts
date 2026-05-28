import { PrismaClient } from "@prisma/client/client";
import { UserService } from "@services/user.service";

export class UserController {
    private userService: UserService;

    constructor(private readonly prismaClient: PrismaClient) {
        this.userService = new UserService(prismaClient);
    }

    async createUser() {}

    async findAllUsers() {}

    async updateUser() {}

    async deleteUser() {}

    async singInUser() {}
}
