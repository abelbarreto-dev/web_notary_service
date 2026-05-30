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
        details?: ErrorProps;
    };
}
