import {faker} from "@faker-js/faker";

type NotaryStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

type NotaryType = "BIRTH_CERTIFICATE" | "SIGNATURE_AUTHENTICATION" | "DOCUMENT_AUTHENTICATION" | "DEED" | "OTHER";

export type NotaryMocked = {
    id?: string;
    name: string,
    cpf: string,
    description: string;
    requestDate: Date;
    remarks?: string;
    notaryStatus: NotaryStatus;
    notaryType: NotaryType;
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export function makeNotaryMocked(userId: string, override: {}): NotaryMocked {
    return {
        name: faker.person.fullName(),
        cpf: faker.string.numeric({length: 11}),
        description: faker.lorem.text(),
        requestDate: new Date(),
        remarks: faker.number.int() % 2 == 0 ? faker.lorem.sentence() : undefined,
        notaryStatus: faker.helpers.arrayElement<NotaryStatus>(["PENDING", "IN_PROGRESS", "COMPLETED"]),
        notaryType: faker.helpers.arrayElement<NotaryType>([
            "BIRTH_CERTIFICATE",
            "SIGNATURE_AUTHENTICATION",
            "DOCUMENT_AUTHENTICATION",
            "DEED",
            "OTHER"
        ]),
        userId: userId,
        ...override,
    };
}