import { NotaryType, NotarySratus } from "../../../enums/enums.ts";

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
