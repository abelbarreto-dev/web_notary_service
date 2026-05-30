import Chance from "chance";
import { generateCPF } from "../../src/utils/general/cpf.util";
import { uuidMocked } from "@test/mocks/uuid.mocked";

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
    userId: string;
    notaryStatus: NotaryStatus;
    notaryType: NotaryType;
    createdAt?: Date;
    updatedAt?: Date;
};

export function makeNotaryMocked(override: {}): NotaryMocked {
    return {
        applicant: chance.name(),
        cpf: generateCPF(),
        description: chance.paragraph({ sentences: 10 }).substring(0, 254),
        requestDate: new Date(),
        remarks: chance.bool() ? chance.sentence({ words: 10 }) : undefined,
        userId: uuidMocked(),
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
