import { NotaryStatus, NotaryType } from "../enums/enums";

export interface NotaryInput {
    id?: string;
    applicant: string;
    cpf: string;
    description: string;
    requestDate: string;
    remarks?: string;
    userId: string;
    notaryStatus: NotaryStatus;
    notaryType: NotaryType;
}

export interface NotaryId {
    id: string;
}

export interface Notary {
    id: string;
    applicant: string;
    cpf: string;
    description: string;
    requestDate: string;
    remarks?: string;
    userId: string;
    notaryStatus: NotaryStatus;
    notaryType: NotaryType;
    createdAt: string;
    updatedAt?: string;
}
