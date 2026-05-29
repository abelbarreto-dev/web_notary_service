import { regex } from "@infra/regex.context";

export function validatorEmail(email: string): boolean {
    return regex.email(email);
}
