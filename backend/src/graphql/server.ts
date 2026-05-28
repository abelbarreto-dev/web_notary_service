import { mainResolvers } from "@graphql-pkg/resolvers/index.resolvers";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "../../prisma/client/client";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import path from "node:path";

const typesArray = loadFilesSync(
    path.join(__dirname, "../graphql/models/**/*.graphql")
)

const typeDefs = mergeTypeDefs(typesArray);

const resolvers = mainResolvers;

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

export async function startServerGraphQL(prismaClient: PrismaClient) {
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        context: async () => {
            return {prisma: prismaClient}
        },
    });

    console.log(`🚀 Server GraphQL is running at: ${url}`);
}
