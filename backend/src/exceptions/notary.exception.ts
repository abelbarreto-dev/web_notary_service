import {
    ExceptionContext,
    ExceptionType,
} from "@infra/contexts/exception.context";

export class NotaryException extends ExceptionContext {
    constructor(props: ExceptionType) {
        super(props);
    }
}
