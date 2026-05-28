import { startServerGraphQL } from "@graphql-pkg/server";
import { prismaClient } from "@infra/connection";

const prisma = prismaClient();

startServerGraphQL(prisma)
    .then(() => console.info("✨ Server GraphQL started"))
    .catch((error) => {
        console.error("💥 Critical Error Found!", error);
        process.exit(1);
    });
