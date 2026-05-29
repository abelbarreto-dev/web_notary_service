import { Notary as NotaryDB } from "../../../prisma/client/client";
import { Notary } from "@infra/notary.models";
import { NotaryStatus, NotaryType } from "@infra/enums";

export async function notaryResponseFactory(
    notaryDB: NotaryDB,
): Promise<Notary> {
    const notaryStatus = notaryDB.notaryStatus as NotaryStatus;
    const notaryType = notaryDB.notaryType as NotaryType;
    const requestDate = notaryDB.requestDate.toISOString();
    const createdAt: string = notaryDB.createdAt.toISOString();
    const updatedAt: string | undefined =
        notaryDB.updatedAt?.toISOString() ?? undefined;

    return {
        id: notaryDB.id,
        applicant: notaryDB.applicant,
        cpf: notaryDB.cpf,
        description: notaryDB.description,
        remarks: notaryDB?.remarks ?? undefined,
        requestDate,
        notaryStatus,
        notaryType,
        createdAt,
        updatedAt,
    };
}
