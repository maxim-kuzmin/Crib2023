import {
  type ApiRequest,
  type ApiRequestWithInput,
  type ApiResult,
  type OperationInput,
  type OperationHandler
} from '../../all';

export interface ApiRequestHandler {
  readonly handleWithInput: <
    TInput,
    TRequest extends ApiRequestWithInput<TInput>,
    TResponse,
    TResult extends ApiResult<TResponse>
  > (
    request: TRequest,
    getResult: () => Promise<TResult>
  ) => Promise<TResult | null>;

  readonly handleWithoutInput: <
    TRequest extends ApiRequest,
    TResponse,
    TResult extends ApiResult<TResponse>
  >(
    request: TRequest,
    getResult: () => Promise<TResult>
  ) => Promise<TResult | null>;
}

export class ApiRequestHandlerImpl implements ApiRequestHandler {
  constructor (private readonly operationHandler: OperationHandler) {}

  async handleWithInput<
    TInput,
    TRequest extends ApiRequestWithInput<TInput>,
    TResponse,
    TResult extends ApiResult<TResponse>
  > (
    request: TRequest,
    getResult: () => Promise<TResult>
  ): Promise<TResult | null> {
    const { operationCode, operationName, input } = request;

    return await this.handle({
      operationCode,
      operationName,
      input
    },
    request,
    getResult);
  }

  async handleWithoutInput<
    TRequest extends ApiRequest,
    TResponse,
    TResult extends ApiResult<TResponse>
  > (
    request: TRequest,
    getResult: () => Promise<TResult>
  ): Promise<TResult | null> {
    const { operationCode, operationName } = request;

    return await this.handle({
      operationCode,
      operationName
    },
    request,
    getResult);
  }

  private async handle<
    TRequest extends ApiRequest,
    TResponse,
    TResult extends ApiResult<TResponse>
  > (
    operationInput: OperationInput,
    request: TRequest,
    getResult: () => Promise<TResult>
  ): Promise<TResult | null> {
    try {
      this.operationHandler.handleStart(operationInput);

      request.operationCode = this.operationHandler.operationCode;

      const result = await getResult();

      const { operationCode, data } = result;

      this.operationHandler.handleSuccess({
        operationCode,
        data
      });

      return result;
    } catch (error: any) {
      this.operationHandler.handleError(error);
    }

    return null;
  }
}
