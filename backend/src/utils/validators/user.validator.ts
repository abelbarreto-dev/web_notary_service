import { UserRole } from "@infra/enums";
import { UserException } from "@exception/user.exception";
import { ExceptionType } from "@infra/exception.context";
import { validatorEmail } from "../general/email.util";
import { regex } from "@infra/regex.context";

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
            "the user full name does not matches to the regex expression";
        propsException.stack = "user.name";
        throw new UserException(propsException);
    }
}

function emailTesting(email?: string) {
    if (!validatorEmail(email || "")) {
        propsException.message = "invalid user email format";
        propsException.cause =
            "the user email address does not matches to the regex expression";
        propsException.stack = "user.email";
        throw new UserException(propsException);
    }
}

function passwordTesting(password?: string) {
    if (!regex.password(password || "", 511, 4)) {
        propsException.message = "invalid user password format";
        propsException.cause =
            "the user password does not matches to the regex expression";
        propsException.stack = "user.password";
        throw new UserException(propsException);
    }
}

function profileTesting(profile?: UserRole) {
    if (!profile) {
        propsException.message = "invalid user profile value";
        propsException.cause =
            "the user profile does not matches to the expected ADMINISTRATOR or ATTENDANT";
        propsException.stack = "user.profile";
        throw new UserException(propsException);
    }
}

export function validateUserLogin(user: UserValidator) {
    emailTesting(user.email);
    passwordTesting(user.password);
}

export function validateUserCreateOrUpdate(user: UserValidator) {
    nameTesting(user.name);
    emailTesting(user.email);
    passwordTesting(user.password);
    profileTesting(user.profile);
}
