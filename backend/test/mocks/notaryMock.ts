import Chance from "chance";
import { generateCPF } from "../../src/utils/cpfUtil";

const chance = new Chance();

type NotaryStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

type NotaryType =
    | "BIRTH_CERTIFICATE"
    | "SIGNATURE_AUTHENTICATION"
    | "DOCUMENT_AUTHENTICATION"
    | "DEED"
    | "OTHER";

export type NotaryMocked = {
    id?: string;
    applicant: string;
    cpf: string;
    description: string;
    requestDate: Date;
    remarks?: string | null;
    notaryStatus: NotaryStatus;
    notaryType: NotaryType;
    createdAt?: Date;
    updatedAt?: Date;
};

export function makeNotaryMocked(override: {}): NotaryMocked {
    return {
        applicant: chance.name(),
        cpf: generateCPF(),
        description: chance.paragraph().substring(0, 255),
        requestDate: new Date(),
        remarks: chance.bool() ? chance.sentence({ words: 10 }) : undefined,
        notaryStatus: chance.pickone<NotaryStatus>([
            "PENDING",
            "IN_PROGRESS",
            "COMPLETED",
        ]),
        notaryType: chance.pickone<NotaryType>([
            "BIRTH_CERTIFICATE",
            "SIGNATURE_AUTHENTICATION",
            "DOCUMENT_AUTHENTICATION",
            "DEED",
            "OTHER",
        ]),
        ...override,
    };
}
