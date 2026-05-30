import {
    ErrorFactory,
    FormatedResponse,
    SuccessFactory,
} from "../../utils/factories/response.factory";

type BusinessLogic<TData, TContext, TReturn> = (
    _: any,
    data: TData,
    context: TContext,
) => Promise<TReturn>;

export function layerResponseWrapper<TData, TContext, TReturn>(
    operation: BusinessLogic<TData, TContext, TReturn>,
) {
    return async (
        _: any = undefined,
        data: TData,
        context: TContext,
    ): Promise<FormatedResponse<TReturn | null>> => {
        try {
            const result = await operation(_, data, context);

            return SuccessFactory.create(result);
        } catch (error: unknown) {
            return ErrorFactory.create(error);
        }
    };
}
