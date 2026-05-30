import { graphqlRequest } from "./request.ts";
import type { FormatedResponse } from "./types/response/types.response.ts";
import type { NotaryId, NotaryInput } from "./types/request/notary.request.ts";
import {
    createNotaryMutation,
    deleteNotaryMutation,
    updateNotaryMutation,
} from "./mutations/notary.mutation.ts";
import type { Notary } from "./types/response/notary.response.ts";
import { findAllUsersQuery } from "./queries/user.query.ts";

export const NotaryService = {
    createNotary: async (notary: NotaryInput) => {
        return graphqlRequest<FormatedResponse<Notary>>(createNotaryMutation, {
            data: notary,
        });
    },

    findAllNotaries: async () => {
        return graphqlRequest<FormatedResponse<Notary>>(findAllUsersQuery);
    },

    updateNotary: async (notary: NotaryInput) => {
        return graphqlRequest<FormatedResponse<Notary>>(updateNotaryMutation, {
            data: notary,
        });
    },

    deleteNotary: async (notary: NotaryId) => {
        return graphqlRequest<FormatedResponse<Notary>>(deleteNotaryMutation, {
            data: notary,
        });
    },
};
