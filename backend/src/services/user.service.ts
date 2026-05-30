import { UserRepository } from "@repositories/user.repository";
import { PrismaClient, User } from "../../prisma/client/client";
import { UserId, UserInput, UserLogin } from "@infra/models/user.models";
import {
    validateUserCreateOrUpdate,
    validateUserId,
    validateUserLogin,
    validateUserPassword,
} from "../utils/validators/user.validator";
import { encryptPassword } from "../utils/general/password.util";

export class UserService {
    private userRepository: UserRepository;

    constructor(private readonly prismaClient: PrismaClient) {
        this.userRepository = new UserRepository(prismaClient);
    }

    async createUser(user: UserInput): Promise<User> {
        await validateUserCreateOrUpdate(user);

        const password = await encryptPassword(user.password);

        const userData: UserInput = {
            ...user,
            password,
        };

        return await this.userRepository.createUser(userData);
    }

    async findAllUsers(): Promise<User[]> {
        return await this.userRepository.findAllUsers();
    }

    async updateUser(user: UserInput): Promise<User> {
        await validateUserCreateOrUpdate(user);

        return await this.userRepository.updateUser(user);
    }

    async deleteUser(user: UserId): Promise<User> {
        await validateUserId(user);

        return await this.userRepository.deleteUser(user);
    }

    async signInUser(user: UserLogin): Promise<User> {
        await validateUserLogin(user);

        const userDB: User = await this.userRepository.signInUser(user);

        await validateUserPassword(user.password, userDB.password);

        return userDB;
    }
}
