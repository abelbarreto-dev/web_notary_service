export const createUserMutation = `
mutation Mutation($data: UserInput!) {
    createUser(user: $data) {
        success
        message
        data {
            id
            name
            email
            profile
            createdAt
            updatedAt
        }
    }
}
`;

export const updateUserMutation = `
mutation Mutation($data: UserInput!) {
    updateUser(user: $data) {
        success
        message
        data {
            id
            name
            email
            profile
            createdAt
            updatedAt
        }
    }
}
`;

export const deleteUserMutation = `
mutation Mutation($data: UserId!) {
    deleteUser(user: $data) {
        success
        message
        data {
            id
            name
            email
            profile
            createdAt
            updatedAt
        }
    }
}
`;

export const signInUserMutation = `
mutation Mutation($data: UserLogin!) {
    signInUser(user: $data) {
        success
        message
        data {
            id
            name
            email
            profile
            createdAt
            updatedAt
        }
    }
}
`;
