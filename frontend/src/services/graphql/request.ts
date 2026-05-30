import { graphQLClient } from "../client.ts";

export async function graphqlRequest<T>(
    query: string,
    variables?: Record<string, any>,
): Promise<T> {
    const { data } = await graphQLClient.post("/graphql", {
        query,
        variables,
    });

    if (data.errors) {
        throw new Error(data.errors[0].message);
    }

    return data.data;
}
