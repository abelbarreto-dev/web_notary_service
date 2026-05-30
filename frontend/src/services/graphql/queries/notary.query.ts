export const findAllNotariesQuery = `
query {
    findAllNotaries {
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
