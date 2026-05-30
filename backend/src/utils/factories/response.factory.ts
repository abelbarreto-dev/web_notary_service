import { ExceptionContext } from "@infra/contexts/exception.context";

type ErrorProps = {
    code: number;
    message: string;
    cause?: string;
    stack?: string;
};

export interface FormatedResponse<T = any> {
    success: boolean;
    message: string;
    cause?: string;
    data?: T;
    error?: {
        code: string;
        details?: any;
    };
}

export class SuccessFactory {
    static create<T>(
        data: T,
        message: string = "operation successfully.",
    ): FormatedResponse<T> {
        return {
            success: true,
            message,
            data,
        };
    }
}

export class ErrorFactory {
    static create(error: unknown): FormatedResponse<null> {
        console.error("🔥 error layer activate:", error);

        const properties: ErrorProps = {
            code: 500,
            message: "internal server error",
            cause: undefined,
            stack: undefined,
        };

        const exceptionContext = error instanceof ExceptionContext;

        if (exceptionContext) {
            const except = error as ExceptionContext;

            properties.code = except.code;
            properties.cause = except.cause as string;
            properties.stack = except.stack as string;
        }

        return {
            success: false,
            message: properties.message,
            cause: exceptionContext ? properties.cause : undefined,
            error: {
                code: properties.code.toString(),
                details: properties.stack,
            },
        };
    }
}
