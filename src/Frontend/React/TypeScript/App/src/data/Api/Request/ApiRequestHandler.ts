import { type ShouldBeCanceled } from '../../../common';
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
