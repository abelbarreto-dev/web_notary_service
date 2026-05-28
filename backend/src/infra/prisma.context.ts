import { PrismaClient } from "../../prisma/client/client";

export interface PrismaContext {
    prisma: PrismaClient;
}
