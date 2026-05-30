import { graphqlRequest } from "./request.ts";
import { findAllUsersQuery } from "./queries/user.query.ts";
import type { FormatedResponse } from "./types/response/types.response.ts";
import type { UserId, UserInput } from "./types/request/user.request.ts";
import {
    createUserMutation,
    deleteUserMutation,
    updateUserMutation,
} from "./mutations/user.mutation.ts";

export const UserService = {
    createUser: async (user: UserInput) => {
        return graphqlRequest<FormatedResponse<UserInput>>(createUserMutation, {
            data: user,
        });
    },

    findAllUsers: async () => {
        return graphqlRequest<FormatedResponse<UserInput[]>>(findAllUsersQuery);
    },

    updateUser: async (user: UserInput) => {
        return graphqlRequest<FormatedResponse<UserInput>>(updateUserMutation, {
            data: user,
        });
    },

    deleteUser: async (user: UserId) => {
        return graphqlRequest<FormatedResponse<UserInput>>(deleteUserMutation, {
            data: user,
        });
    },
};
