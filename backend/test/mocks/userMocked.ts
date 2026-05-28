import Chance from "chance";

const chance = new Chance();

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
        name: chance.name(),
        email: chance.email(),
        password: chance.string({ alpha: true, numeric: true, length: 12 }),
        profile: chance.pickone<ProfileType>(["ADMINISTRATOR", "ATTENDANT"]),
        ...overrides,
    };
}
