import { NotaryStatus, NotaryType } from "@infra/enums";
import { ExceptionType } from "@infra/exception.context";
import { regex } from "@infra/regex.context";
import { NotaryException } from "@exception/notary.exception";

type NotaryValidator = {
    applicant?: string;
    cpf?: string;
    description?: string;
    remarks?: string;
    notaryStatus?: NotaryStatus;
    notaryType?: NotaryType;
};

const propsException: ExceptionType = {
    code: 400,
    cause: undefined,
    message: "",
    name: "UserException",
    stack: undefined,
};

function applicantTesting(applicant?: string) {
    if (!regex.name(applicant || "", 254, 2)) {
        propsException.message = "invalid notary applicant format";
        propsException.cause =
            "the user full name does not matches to the regex expression";
        propsException.stack = "notary.applcant";
        throw new NotaryException(propsException);
    }
}

function cpfTesting(cpf?: string) {
    if (!regex.cpf(cpf || "")) {
        propsException.message = "invalid notary cpf format";
        propsException.cause =
            "the notary cpf does not matches to the regex expression";
        propsException.stack = "notary.cpf";
        throw new NotaryException(propsException);
    }
}

function descriptionTesting(description?: string) {
    if (!regex.text(description || "", 254, 4)) {
        propsException.message = "invalid notary description format";
        propsException.cause =
            "the notary description does not matches to the regex expression";
        propsException.stack = "notary.description";
        throw new NotaryException(propsException);
    }
}

function remarksTesting(remarks?: string) {
    if (remarks) {
        if (!regex.text(remarks || "", 511, 4)) {
            propsException.message = "invalid notary remarks format";
            propsException.cause =
                "the remarks does not matches to the regex expression";
            propsException.stack = "notary.remarks";
            throw new NotaryException(propsException);
        }
    }
}

function notaryStatusTesting(notaryStatus?: NotaryStatus) {
    if (!notaryStatus) {
        propsException.message = "invalid notary status value";
        propsException.cause =
            "the notary status does not matches to the values PENDING, IN_PROGRESS, COMPLETED";
        propsException.stack = "notary.notaryStatus";
        throw new NotaryException(propsException);
    }
}

function notaryTypeTesting(notaryType?: NotaryType) {
    if (!notaryType) {
        propsException.message = "invalid notary status type";
        propsException.cause =
            "the notary type does not matches to the values BIRTH_CERTIFICATE, " +
            "SIGNATURE_AUTHENTICATION, DOCUMENT_AUTHENTICATION, DEED, OTHER";
        propsException.stack = "notary.notaryType";
        throw new NotaryException(propsException);
    }
}

export function notaryTesting(notary?: NotaryValidator) {
    applicantTesting(notary?.applicant);
    cpfTesting(notary?.cpf);
    descriptionTesting(notary?.description);
    remarksTesting(notary?.remarks);
    notaryStatusTesting(notary?.notaryStatus);
    notaryTypeTesting(notary?.notaryType);
}
