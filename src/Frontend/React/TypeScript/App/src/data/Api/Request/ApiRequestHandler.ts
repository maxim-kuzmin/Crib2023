import { type ShouldBeCanceled } from '../../../common';
import { type ApiOperationResponse } from '../Operation';
import { type ApiRequest } from './ApiRequest';
import { type ApiRequestWithInput } from './ApiRequestWithInput';

export interface ApiRequestHandler {
  readonly handleWithInput: <
    TInput,
    TRequest extends ApiRequestWithInput<TInput>,
    TOutput,
    TResponse extends ApiOperationResponse<TOutput>
  > (
    request: TRequest,
    getResult: () => Promise<TResponse | null>,
    shouldBeCanceled: ShouldBeCanceled
  ) => Promise<TResponse | null>;

  readonly handleWithoutInput: <
    TRequest extends ApiRequest,
    TOutput,
    TResponse extends ApiOperationResponse<TOutput>
  >(
    request: TRequest,
    getResult: () => Promise<TResponse | null>,
    shouldBeCanceled: ShouldBeCanceled
  ) => Promise<TResponse | null>;
}
