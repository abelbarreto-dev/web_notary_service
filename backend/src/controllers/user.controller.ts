import { UserService } from "@services/user.service";
import { PrismaClient } from "../../prisma/client/client";

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
