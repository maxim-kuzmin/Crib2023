import { type OperationHandler, type OperationInput } from '../../../common';
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
    abortController: AbortController
  ) => Promise<TResponse | null>;

  readonly handleWithInputAndOutput: <
    TInput,
    TRequest extends ApiRequestWithInput<TInput>,
    TOutput,
    TResponse extends ApiOperationResponseWithData<TOutput>
  > (
    request: TRequest,
    getResult: () => Promise<TResponse | null>,
    abortController: AbortController
  ) => Promise<TResponse | null>;

  readonly handleWithOutput: <
    TRequest extends ApiRequest,
    TOutput,
    TResponse extends ApiOperationResponseWithData<TOutput>
  >(
    request: TRequest,
    getResult: () => Promise<TResponse | null>,
    abortController: AbortController
  ) => Promise<TResponse | null>;

  readonly handleWithoutInputAndOutput: <
    TRequest extends ApiRequest,
    TResponse extends ApiOperationResponse
  > (
    request: TRequest,
    getResult: () => Promise<TResponse | null>,
    abortController: AbortController
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
    abortController: AbortController
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
      abortController
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
    abortController: AbortController
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
      abortController
    );
  }

  async handleWithOutput<
    TRequest extends ApiRequest,
    TOutput,
    TResponse extends ApiOperationResponseWithData<TOutput>
  > (
    request: TRequest,
    getResult: () => Promise<TResponse | null>,
    abortController: AbortController
  ): Promise<TResponse | null> {
    const { operationCode, operationName } = request;

    return await this.handle(
      {
        operationCode,
        operationName
      },
      request,
      getResult,
      abortController
    );
  }

  async handleWithoutInputAndOutput<
    TRequest extends ApiRequest,
    TResponse extends ApiOperationResponse
  > (
    request: TRequest,
    getResult: () => Promise<TResponse | null>,
    abortController: AbortController
  ): Promise<TResponse | null> {
    const { operationCode, operationName } = request;

    return await this.handle(
      {
        operationCode,
        operationName
      },
      request,
      getResult,
      abortController
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
    abortController: AbortController
  ): Promise<TResponse | null> {
    let result: TResponse | null = null;

    try {
      this.operationHandler.handleStart(operationInput);

      request.operationCode = this.operationHandler.operationCode;

      result = await getResult();

      if (result) {
        if (!abortController.signal.aborted) {
          const { operationCode, data, error } = result;

          if (error && error.responseStatus !== 404) {
            this.operationHandler.handleError(error);
          } else {
            this.operationHandler.handleSuccess({
              operationCode,
              data
            });
          }
        }
      }
    } catch (error: unknown) {
      if (!abortController.signal.aborted) {
        this.operationHandler.handleError(error);
      }
    }

    return result;
  }
}

export function createApiRequestHandler (options: Options): ApiRequestHandler {
  return new Implementation(options);
}
