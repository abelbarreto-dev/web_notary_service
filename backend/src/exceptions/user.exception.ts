import { ExceptionContext, ExceptionType } from "@infra/exception.context";

export class UserException extends ExceptionContext {
    constructor(props: ExceptionType) {
        super(props);
    }
}
