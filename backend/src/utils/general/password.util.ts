import * as crypto from "crypto";
import * as bcrypt from "bcrypt";

function hashedPassword(password: string): string {
    return crypto.createHash("sha256").update(password).digest("hex");
}

export async function encryptPassword(password: string): Promise<string> {
    const passwordSha256 = hashedPassword(password);

    const salts = 10;

    return await bcrypt.hash(passwordSha256, salts);
}

export async function comparePasswords(
    password: string,
    hashed: string,
): Promise<boolean> {
    const passwordSha256 = hashedPassword(password);

    return await bcrypt.compare(passwordSha256, hashed);
}
