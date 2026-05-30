import {
    ExceptionContext,
    ExceptionType,
} from "@infra/contexts/exception.context";

export class UserException extends ExceptionContext {
    constructor(props: ExceptionType) {
        super(props);
    }
}
