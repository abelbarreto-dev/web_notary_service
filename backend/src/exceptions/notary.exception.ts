import { ExceptionContext, ExceptionType } from "@infra/exception.context";

export class NotaryException extends ExceptionContext {
    constructor(props: ExceptionType) {
        super(props);
    }
}
