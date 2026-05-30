import { regex } from "@infra/contexts/regex.context";

export function validateUUID(uuid: string): boolean {
    return regex.uuid(uuid);
}
