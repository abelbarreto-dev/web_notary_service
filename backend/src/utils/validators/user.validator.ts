import { UserRole } from "@infra/enums";
import { UserException } from "@exception/user.exception";
import { ExceptionType } from "@infra/exception.context";
import { validatorEmail } from "../general/email.util";
import { regex } from "@infra/regex.context";
import { comparePasswords } from "../general/password.util";
import { UserId } from "@infra/user.models";
import { validateUUID } from "../general/uuid.util";

type UserValidator = {
    name?: string;
    email?: string;
    password?: string;
    profile?: UserRole;
};

const propsException: ExceptionType = {
    code: 400,
    cause: undefined,
    message: "",
    name: "UserException",
    stack: undefined,
};

function nameTesting(name?: string) {
    if (!regex.name(name || "", 127, 2)) {
        propsException.message = "invalid user name format";
        propsException.cause =
            "the user full name does not match to the regex expression";
        propsException.stack = "user.name";
        throw new UserException(propsException);
    }
}

function emailTesting(email?: string) {
    if (!validatorEmail(email || "")) {
        propsException.message = "invalid user email format";
        propsException.cause =
            "the user email address does not match to the regex expression";
        propsException.stack = "user.email";
        throw new UserException(propsException);
    }
}

function passwordTesting(password?: string) {
    if (!regex.password(password || "", 511, 4)) {
        propsException.message = "invalid user password format";
        propsException.cause =
            "the user password does not match to the regex expression";
        propsException.stack = "user.password";
        throw new UserException(propsException);
    }
}

function profileTesting(profile?: UserRole) {
    if (!profile) {
        propsException.message = "invalid user profile value";
        propsException.cause =
            "the user profile does not match to the expected ADMINISTRATOR or ATTENDANT";
        propsException.stack = "user.profile";
        throw new UserException(propsException);
    }
}

export async function validateUserLogin(user: UserValidator) {
    emailTesting(user.email);
    passwordTesting(user.password);
}

export async function validateUserPassword(
    password: string,
    hashedPassword: string,
): Promise<void> {
    const authorized: boolean = await comparePasswords(
        password,
        hashedPassword,
    );

    if (!authorized) {
        propsException.message = "invalid user password credentials";
        propsException.cause = "the sent password does not match to this user";
        propsException.stack = "process.user.login";
        throw new UserException(propsException);
    }
}

export async function validateUserCreateOrUpdate(user: UserValidator) {
    nameTesting(user.name);
    emailTesting(user.email);
    passwordTesting(user.password);
    profileTesting(user.profile);
}

export async function validateUserId(userId: UserId) {
    if (!validateUUID(userId.id)) {
        propsException.message = "invalid user id format";
        propsException.cause =
            "the user id does not match to the regex expression";
        propsException.stack = "user.id";
        throw new UserException(propsException);
    }
}
