import { faker } from "@faker-js/faker";

type ProfileType = "ADMINISTRATOR" | "ATTENDANT";

export type UserMocked = {
    id?: string;
    name: string;
    email: string;
    password: string;
    profile: ProfileType;
    createdAt?: Date;
    updatedAt?: Date;
};

export function makeUserMocked(overrides = {}): UserMocked {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        profile: faker.helpers.arrayElement<ProfileType>(["ADMINISTRATOR", "ATTENDANT"]),
        ...overrides,
    };
}
