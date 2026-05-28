import { DateTimeResolver } from "graphql-scalars";
import { notaryResolvers } from "./notary.resolvers";
import { userResolvers } from "./user.resolvers";

export const resolvers = {
    DateTime: DateTimeResolver,

    Query: {
        ...userResolvers.Query,
        ...notaryResolvers.Query,
    },

    Mutation: {
        ...userResolvers.Mutation,
        ...notaryResolvers.Mutation,
    },
};
