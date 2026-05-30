import { regex } from "@infra/contexts/regex.context";

export function validatorEmail(email: string): boolean {
    return regex.email(email);
}
