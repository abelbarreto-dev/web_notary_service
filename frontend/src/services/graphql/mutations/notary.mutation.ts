export const createNotaryMutation = `
mutation Mutation($data: NotaryInput!) {
    createNotary(notary: $data) {
        success
        message
        data {
            id
            applicant
            cpf
            description
            requestDate
            remarks
            notaryStatus
            notaryType
            createdAt
            updatedAt
        }
    }
}
`;

export const updateNotaryMutation = `
mutation Mutation($data: NotaryInput!) {
    updateNotary(notary: $data) {
        success
        message
        data {
            id
            applicant
            cpf
            description
            requestDate
            remarks
            notaryStatus
            notaryType
            createdAt
            updatedAt
        }
    }
}
`;

export const deleteNotaryMutation = `
mutation Mutation($data: NotaryId!) {
    deleteNotary(notary: $data) {
        success
        message
        data {
            id
            applicant
            cpf
            description
            requestDate
            remarks
            notaryStatus
            notaryType
            createdAt
            updatedAt
        }
    }
}
`;
