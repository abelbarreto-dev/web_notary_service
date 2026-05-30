import { NotaryType, NotarySratus } from "../../../enums/enums.ts";

export interface NotaryInput {
    id?: string;
    applicant: string;
    cpf: string;
    description: string;
    requestDate: string;
    remarks?: string;
    notaryStatus: NotaryStatus;
    notaryType: NotaryType;
}

export interface NotaryId {
    id: string;
}
