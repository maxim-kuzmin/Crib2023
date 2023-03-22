import {
  type ApiRequest,
  type ApiRequestWithInput,
  type ApiResult,
  type OperationDataOnStart,
  type OperationHandler
} from '../../all';

export interface ApiRequestHandler {
  readonly handleWithInput: <TInput, TRequest extends ApiRequestWithInput<TInput>, TResponse> (
    request: TRequest,
    getResult: () => Promise<ApiResult<TResponse>>
  ) => Promise<ApiResult<TResponse>>;

  readonly handleWithoutInput: <TRequest extends ApiRequest, TResponse> (
    request: TRequest,
    getResult: () => Promise<ApiResult<TResponse>>
  ) => Promise<ApiResult<TResponse>>;
}

export class ApiRequestHandlerImpl implements ApiRequestHandler {
  constructor (private readonly operationHandler: OperationHandler) {}

  async handleWithInput<TInput, TRequest extends ApiRequestWithInput<TInput>, TResponse> (
    request: TRequest,
    getResult: () => Promise<ApiResult<TResponse>>
  ): Promise<ApiResult<TResponse>> {
    const { operationCode, operationName, input: requestInput } = request;

    return await this.handle({
      operationCode,
      operationName,
      requestInput
    },
    request,
    getResult);
  }

  async handleWithoutInput<TRequest extends ApiRequest, TResponse> (
    request: TRequest,
    getResult: () => Promise<ApiResult<TResponse>>
  ): Promise<ApiResult<TResponse>> {
    const { operationCode, operationName } = request;

    return await this.handle({
      operationCode,
      operationName
    },
    request,
    getResult);
  }

  private async handle<TRequest extends ApiRequest, TResponse> (
    operationDataOnStart: OperationDataOnStart,
    request: TRequest,
    getResult: () => Promise<ApiResult<TResponse>>
  ): Promise<ApiResult<TResponse>> {
    try {
      this.operationHandler.handleStart(operationDataOnStart);

      request.operationCode = this.operationHandler.operationCode;

      const result = await getResult();

      this.operationHandler.handleSuccess({
        operationCode: result.operationCode,
        responseData: result.data
      });

      return result;
    } catch (error: any) {
      this.operationHandler.handleError(error);
    }

    return {
      data: null,
      operationCode: operationDataOnStart.operationCode,
      responseDetailsData: null,
      responseErrorsData: null,
      responseStatusCode: 0
    };
  }
}
