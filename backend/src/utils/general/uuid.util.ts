import { regex } from "@infra/regex.context";

export function validateUUID(uuid: string): boolean {
    return regex.uuid(uuid);
}
