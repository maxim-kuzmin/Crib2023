import {
  type ApiRequest,
  type ApiRequestHandler,
  type ApiRequestWithInput,
  type ApiOperationResponse,
  type OperationInput,
  type OperationHandler,
  type ShouldBeCanceled
} from '../../../../../../all';

interface Options {
  operationHandler: OperationHandler;
}

export class ApiRequestHandlerImpl implements ApiRequestHandler {
  private readonly operationHandler: OperationHandler

  constructor (options: Options) {
    this.operationHandler = options.operationHandler;
  }

  async handleWithInput<
    TInput,
    TRequest extends ApiRequestWithInput<TInput>,
    TOutput,
    TResponse extends ApiOperationResponse<TOutput>
  > (
    request: TRequest,
    getResult: () => Promise<TResponse | null>,
    shouldBeCanceled: ShouldBeCanceled
  ): Promise<TResponse | null> {
    const { operationCode, operationName, input } = request;

    return await this.handle({
      operationCode,
      operationName,
      input
    },
    request,
    getResult,
    shouldBeCanceled);
  }

  async handleWithoutInput<
    TRequest extends ApiRequest,
    TOutput,
    TResponse extends ApiOperationResponse<TOutput>
  > (
    request: TRequest,
    getResult: () => Promise<TResponse | null>,
    shouldBeCanceled: ShouldBeCanceled
  ): Promise<TResponse | null> {
    const { operationCode, operationName } = request;

    return await this.handle({
      operationCode,
      operationName
    },
    request,
    getResult,
    shouldBeCanceled);
  }

  private async handle<
    TRequest extends ApiRequest,
    TOutput,
    TResponse extends ApiOperationResponse<TOutput>
  > (
    operationInput: OperationInput,
    request: TRequest,
    getResult: () => Promise<TResponse | null>,
    shouldBeCanceled: ShouldBeCanceled
  ): Promise<TResponse | null> {
    let result: TResponse | null = null;

    try {
      this.operationHandler.handleStart(operationInput);

      request.operationCode = this.operationHandler.operationCode;

      result = await getResult();

      if (result) {
        if (!shouldBeCanceled()) {
          const { operationCode, data } = result;

          if (result.error) {
            this.operationHandler.handleError(result.error);
          } else {
            this.operationHandler.handleSuccess({
              operationCode,
              data
            });
          }
        }
      }
    } catch (error: any) {
      if (!shouldBeCanceled()) {
        this.operationHandler.handleError(error);
      }
    }

    return result;
  }
}
