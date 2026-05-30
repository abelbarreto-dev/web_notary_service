import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { startTesting, stopTesting } from "@test/infra/setup/setup.environment";
import { encryptPassword } from "../../../src/utils/general/password.util";
import {
    validateUserCreateOrUpdate,
    validateUserId,
    validateUserPassword,
} from "../../../src/utils/validators/user.validator";
import { UserException } from "@exception/user.exception";
import { uuidMocked } from "@test/mocks/uuid.mocked";
import { UserId } from "@infra/models/user.models";
import { makeUserMocked } from "@test/mocks/user.mocked";
import { UserRole } from "@infra/enums/enums";

beforeAll(() => startTesting());

afterAll(() => stopTesting());

describe("User validator --> validateUserPassword", () => {
    test("user password success compare --> testing comparing", async () => {
        const password = "orange-and-blue_45";

        const hashed = await encryptPassword(password);

        await expect(
            validateUserPassword(password, hashed),
        ).resolves.not.toThrow(UserException);
    });

    test("user password failed compare", async () => {
        const password = "orange-and-blue_45";

        const hashed = await encryptPassword(password);

        const newPassword = "orange-and-blue_46";

        await expect(validateUserPassword(newPassword, hashed)).rejects.toThrow(
            "invalid user password credentials",
        );
    });
});

describe("User validator --> validateUserCreateOrUpdate", () => {
    test("user validate administrator", async () => {
        const admin = makeUserMocked({ profile: "ADMINISTRATOR" });

        await expect(
            validateUserCreateOrUpdate({
                ...admin,
                profile: UserRole[admin.profile],
            }),
        ).resolves.not.toThrow(UserException);
    });

    test("user validate attendant", async () => {
        const attendant = makeUserMocked({ profile: "ATTENDANT" });

        await expect(
            validateUserCreateOrUpdate({
                ...attendant,
                profile: UserRole[attendant.profile],
            }),
        ).resolves.not.toThrow(UserException);
    });

    test("user validate invalid name length < 2", async () => {
        const person = makeUserMocked({ name: "J" });

        await expect(
            validateUserCreateOrUpdate({
                ...person,
                profile: UserRole.ATTENDANT,
            }),
        ).rejects.toThrow("invalid user name format");
    });

    test("user validate invalid name length == 2", async () => {
        const person = makeUserMocked({ name: "Ed" });

        await expect(
            validateUserCreateOrUpdate({
                ...person,
                profile: UserRole.ATTENDANT,
            }),
        ).resolves.not.toThrow(UserException);
    });

    test("user validate invalid name length between 2 to 127", async () => {
        const person = makeUserMocked({ name: "Maria Antonieta" });

        await expect(
            validateUserCreateOrUpdate({
                ...person,
                profile: UserRole.ATTENDANT,
            }),
        ).resolves.not.toThrow(UserException);
    });

    test("user validate invalid name length == 127", async () => {
        const person = makeUserMocked({ name: "Ab ".repeat(42) + "e" });

        await expect(
            validateUserCreateOrUpdate({
                ...person,
                profile: UserRole.ATTENDANT,
            }),
        ).resolves.not.toThrow(UserException);
    });

    test("user validate invalid name length > 127", async () => {
        const person = makeUserMocked({ name: "A ".repeat(64) });

        await expect(
            validateUserCreateOrUpdate({
                ...person,
                profile: UserRole.ATTENDANT,
            }),
        ).rejects.toThrow("invalid user name format");
    });

    test("user validate email failed successfully", async () => {
        const person = makeUserMocked({ name: "Jonny Deep" });

        person.email += "123";

        await expect(
            validateUserCreateOrUpdate({
                ...person,
                profile: UserRole[person.profile],
            }),
        ).rejects.toThrow("invalid user email format");
    });

    test("user validate password failed successfully testing invalid char", async () => {
        const person = makeUserMocked({ name: "Jonny Deep" });

        person.password = " " + person.password;

        await expect(
            validateUserCreateOrUpdate({
                ...person,
                profile: UserRole[person.profile],
            }),
        ).rejects.toThrow("invalid user password format");
    });

    test("user validate password failed successfully testing length < 4", async () => {
        const person = makeUserMocked({ name: "Jonny Deep" });

        person.password = "123";

        await expect(
            validateUserCreateOrUpdate({
                ...person,
                profile: UserRole[person.profile],
            }),
        ).rejects.toThrow("invalid user password format");
    });

    test("user validate password failed successfully testing length == 4", async () => {
        const person = makeUserMocked({ name: "Jonny Deep" });

        person.password = "1234";

        await expect(
            validateUserCreateOrUpdate({
                ...person,
                profile: UserRole[person.profile],
            }),
        ).resolves.not.toThrow(UserException);
    });

    test("user validate password failed successfully testing length == 511", async () => {
        const person = makeUserMocked({ name: "Jonny Deep" });

        person.password = "2".repeat(511);

        await expect(
            validateUserCreateOrUpdate({
                ...person,
                profile: UserRole[person.profile],
            }),
        ).resolves.not.toThrow(UserException);
    });

    test("user validate undefined or null profile", async () => {
        const person = makeUserMocked({ name: "Julian Alvarez" });

        await expect(
            validateUserCreateOrUpdate({
                ...person,
                profile: undefined,
            }),
        ).rejects.toThrow("invalid user profile value");
    });
});

describe("User validator --> validateUserId", () => {
    test("user id success", async () => {
        const userId: UserId = { id: uuidMocked() };

        await expect(validateUserId(userId)).resolves.not.toThrow(
            UserException,
        );
    });

    test("user id success", async () => {
        const userId: UserId = { id: uuidMocked() + "Brazil" };

        await expect(validateUserId(userId)).rejects.toThrow(
            "invalid user id format",
        );
    });
});
