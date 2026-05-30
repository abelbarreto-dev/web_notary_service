import express from "express";
import cors from "cors";
import { mainResolvers } from "@graphql-pkg/resolvers/index.resolvers";
import { PrismaClient } from "../../prisma/client/client";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import path from "node:path";
import { graphqlCorsContext } from "@middleware/cors.middleware";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { createHandler } from "graphql-http/lib/use/express";

const typesArray = loadFilesSync(
    path.join(__dirname, "../graphql/models/**/*.graphql"),
);

const typeDefs = mergeTypeDefs(typesArray);

const resolvers = mainResolvers;

export async function startServerGraphQL(prismaClient: PrismaClient) {
    // schema: queries and resolvers
    const schema = makeExecutableSchema({
        typeDefs,
        resolvers,
    });

    // create application express
    const app = express();

    // apply security middlewares
    app.use("/graphql", cors(graphqlCorsContext));

    // using json by default
    app.use(express.json());

    // mounting route all because graphql can use get and post
    app.all(
        "/graphql",
        createHandler({
            schema,
            context: async () => {
                return { prisma: prismaClient };
            },
        }),
    );

    return app;
}
