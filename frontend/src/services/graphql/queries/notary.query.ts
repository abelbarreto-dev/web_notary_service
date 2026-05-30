export const findAllNotariesQuery = `
query Query($data: UserId!){
    findAllNotaries(user: $data) {
        success
        message
        data {
            id
            applicant
            cpf
            description
            requestDate
            userId
            remarks
            notaryStatus
            notaryType
            createdAt
            updatedAt
        }
    }
}
}
`;
