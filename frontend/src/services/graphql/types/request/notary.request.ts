import { NotarySratus, NotaryType } from "../../../enums/enums.ts";

export interface NotaryInput {
    id?: string;
    applicant: string;
    cpf: string;
    description: string;
    requestDate: string;
    remarks?: string;
    notaryStatus: NotarySratus;
    notaryType: NotaryType;
}

export interface NotaryId {
    id: string;
}
