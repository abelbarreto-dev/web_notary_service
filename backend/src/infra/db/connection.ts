import dotenv from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../prisma/client/client";

let connected = false;
dotenv.config({ path: ".env" });

const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

export function prismaClient() {
    return prisma;
}

export async function openConnection(): Promise<void> {
    if (!connected) {
        await prisma.$connect();
        connected = true;
    }
}

export async function closeConnection() {
    if (!connected) {
        await prisma.$disconnect();
        connected = false;
    }
}
