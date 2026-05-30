import { NotarySratus, NotaryType } from "../../../enums/enums.ts";

export interface Notary {
    id: string;
    applicant: string;
    cpf: string;
    description: string;
    requestDate: string;
    remarks?: string;
    userId: string;
    notaryStatus: NotarySratus;
    notaryType: NotaryType;
    createdAt: string;
    updatedAt?: string;
}
