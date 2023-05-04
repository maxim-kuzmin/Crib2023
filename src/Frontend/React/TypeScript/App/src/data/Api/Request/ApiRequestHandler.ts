import { type OperationHandler, type OperationInput, type ShouldBeCanceled } from '../../../common';
import { type ApiOperationResponse, type ApiOperationResponseWithData } from '../Operation';
import { type ApiRequest } from './ApiRequest';
import { type ApiRequestWithInput } from './ApiRequestWithInput';

export interface ApiRequestHandler {
  readonly handleWithInput: <
    TInput,
    TRequest extends ApiRequestWithInput<TInput>,
    TResponse extends ApiOperationResponse
  > (
    request: TRequest,
    getResult: () => Promise<TResponse | null>,
    shouldBeCanceled: ShouldBeCanceled
  ) => Promise<TResponse | null>;

  readonly handleWithInputAndOutput: <
    TInput,
    TRequest extends ApiRequestWithInput<TInput>,
    TOutput,
    TResponse extends ApiOperationResponseWithData<TOutput>
  > (
    request: TRequest,
    getResult: () => Promise<TResponse | null>,
    shouldBeCanceled: ShouldBeCanceled
  ) => Promise<TResponse | null>;

  readonly handleWithOutput: <
    TRequest extends ApiRequest,
    TOutput,
    TResponse extends ApiOperationResponseWithData<TOutput>
  >(
    request: TRequest,
    getResult: () => Promise<TResponse | null>,
    shouldBeCanceled: ShouldBeCanceled
  ) => Promise<TResponse | null>;

  readonly handleWithoutInputAndOutput: <
    TRequest extends ApiRequest,
    TResponse extends ApiOperationResponse
  > (
    request: TRequest,
    getResult: () => Promise<TResponse | null>,
    shouldBeCanceled: ShouldBeCanceled
  ) => Promise<TResponse | null>;
}

interface Options {
  operationHandler: OperationHandler;
}

class Implementation implements ApiRequestHandler {
  private readonly operationHandler: OperationHandler

  constructor (options: Options) {
    this.operationHandler = options.operationHandler;
  }

  async handleWithInput<
    TInput,
    TRequest extends ApiRequestWithInput<TInput>,
    TResponse extends ApiOperationResponse
  > (
    request: TRequest,
    getResult: () => Promise<TResponse | null>,
    shouldBeCanceled: ShouldBeCanceled
  ): Promise<TResponse | null> {
    const { operationCode, operationName, input } = request;

    return await this.handle(
      {
        operationCode,
        operationName,
        input
      },
      request,
      getResult,
      shouldBeCanceled
    );
  }

  async handleWithInputAndOutput<
    TInput,
    TRequest extends ApiRequestWithInput<TInput>,
    TOutput,
    TResponse extends ApiOperationResponseWithData<TOutput>
  > (
    request: TRequest,
    getResult: () => Promise<TResponse | null>,
    shouldBeCanceled: ShouldBeCanceled
  ): Promise<TResponse | null> {
    const { operationCode, operationName, input } = request;

    return await this.handle(
      {
        operationCode,
        operationName,
        input
      },
      request,
      getResult,
      shouldBeCanceled
    );
  }

  async handleWithOutput<
    TRequest extends ApiRequest,
    TOutput,
    TResponse extends ApiOperationResponseWithData<TOutput>
  > (
    request: TRequest,
    getResult: () => Promise<TResponse | null>,
    shouldBeCanceled: ShouldBeCanceled
  ): Promise<TResponse | null> {
    const { operationCode, operationName } = request;

    return await this.handle(
      {
        operationCode,
        operationName
      },
      request,
      getResult,
      shouldBeCanceled
    );
  }

  async handleWithoutInputAndOutput<
    TRequest extends ApiRequest,
    TResponse extends ApiOperationResponse
  > (
    request: TRequest,
    getResult: () => Promise<TResponse | null>,
    shouldBeCanceled: ShouldBeCanceled
  ): Promise<TResponse | null> {
    const { operationCode, operationName } = request;

    return await this.handle(
      {
        operationCode,
        operationName
      },
      request,
      getResult,
      shouldBeCanceled
    );
  }

  private async handle<
    TRequest extends ApiRequest,
    TOutput,
    TResponse extends ApiOperationResponseWithData<TOutput>
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

export function createApiRequestHandler (options: Options): ApiRequestHandler {
  return new Implementation(options);
}
