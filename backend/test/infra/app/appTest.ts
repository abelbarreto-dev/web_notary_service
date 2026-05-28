import { startServerGraphQL } from "@graphql-pkg/server";
import { prismaTest } from "@test/infra/setup/setupDatabase";

const prisma = prismaTest();

startServerGraphQL(prisma)
    .then(() => console.info("✨ Server GraphQL started"))
    .catch((error) => {
        console.error("💥 Critical Error Found!", error);
        process.exit(1);
    });
