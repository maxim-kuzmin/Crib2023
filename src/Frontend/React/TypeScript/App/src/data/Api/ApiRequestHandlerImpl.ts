import {
  type ApiRequest,
  type ApiRequestHandler,
  type ApiRequestWithInput,
  type ApiOperationResponse,
  type OperationInput,
  type OperationHandler
} from '../../all';

export class ApiRequestHandlerImpl implements ApiRequestHandler {
  constructor (private readonly operationHandler: OperationHandler) {}

  async handleWithInput<
    TInput,
    TRequest extends ApiRequestWithInput<TInput>,
    TOutput,
    TResponse extends ApiOperationResponse<TOutput>
  > (
    request: TRequest,
    getResult: () => Promise<TResponse>
  ): Promise<TResponse | null> {
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
    TOutput,
    TResponse extends ApiOperationResponse<TOutput>
  > (
    request: TRequest,
    getResult: () => Promise<TResponse>
  ): Promise<TResponse | null> {
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
    TOutput,
    TResponse extends ApiOperationResponse<TOutput>
  > (
    operationInput: OperationInput,
    request: TRequest,
    getResult: () => Promise<TResponse>
  ): Promise<TResponse | null> {
    try {
      this.operationHandler.handleStart(operationInput);

      request.operationCode = this.operationHandler.operationCode;

      const result = await getResult();

      const { operationCode, data } = result;

      if (result.error) {
        this.operationHandler.handleError(result.error);
      } else {
        this.operationHandler.handleSuccess({
          operationCode,
          data
        });
      }

      return result;
    } catch (error: any) {
      this.operationHandler.handleError(error);
    }

    return null;
  }
}
