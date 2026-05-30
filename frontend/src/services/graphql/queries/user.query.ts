export const findAllUsersQuery = `
query {
    findAllUsers {
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
