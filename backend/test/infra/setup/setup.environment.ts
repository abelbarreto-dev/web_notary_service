import dotenv from "dotenv";

export function startTesting(): void {
    dotenv.config({ path: ".env.test" });
}

export function stopTesting(): void {
    dotenv.config({ path: ".env" });
}
