import { startServerGraphQL } from "@graphql-pkg/server";
import { prismaClient } from "@infra/db/connection";

const prisma = prismaClient();

(async () => {
    const port = Number.parseInt(process.env.API_PORT ?? "8080");

    // getting the app
    const app = await startServerGraphQL(prisma);

    try {
        // when running
        app.listen(port, () => {
            console.log(
                `🚀 Server Pure GraphQL is running at http://localhost:${port}/graphql`,
            );
            console.info("✨ Server GraphQL started");
        });
    } catch (error) {
        console.error("💥 Critical Error Found!", error);
        process.exit(1);
    }
})();
