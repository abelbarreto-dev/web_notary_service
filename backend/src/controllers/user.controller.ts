import { UserService } from "@services/user.service";
import { PrismaClient } from "../../prisma/client/client";
import { User, UserId, UserInput, UserLogin } from "@infra/models/user.models";
import { userResponseFactory } from "../utils/factories/user.response.factory";

export class UserController {
    private userService: UserService;

    constructor(private readonly prismaClient: PrismaClient) {
        this.userService = new UserService(prismaClient);
    }

    async createUser(user: UserInput): Promise<User> {
        const userDB = await this.userService.createUser(user);

        return await userResponseFactory(userDB);
    }

    async findAllUsers() {
        return await this.userService.findAllUsers();
    }

    async updateUser(user: UserInput) {
        const userDB = await this.userService.updateUser(user);

        return await userResponseFactory(userDB);
    }

    async deleteUser(user: UserId) {
        const userDB = await this.userService.deleteUser(user);

        return await userResponseFactory(userDB);
    }

    async signInUser(user: UserLogin) {
        const userDB = await this.userService.signInUser(user);

        return await userResponseFactory(userDB);
    }
}
