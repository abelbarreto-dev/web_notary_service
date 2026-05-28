import { NotaryStatus, NotaryType } from "./enums";

export interface NotaryInput {
    applicant: string;
    cpf: string;
    description: string;
    requestDate: string;
    remarks?: string;
    notaryStatus: NotaryStatus;
    notaryType: NotaryType;
}

export interface NotaryId {
    id?: string;
}

export interface Notary {
    id: string;
    applicant: string;
    cpf: string;
    description: string;
    requestDate: string;
    remarks?: string;
    notaryStatus: NotaryStatus;
    notaryType: NotaryType;
    createdAt: string;
    updatedAt?: string;
}
