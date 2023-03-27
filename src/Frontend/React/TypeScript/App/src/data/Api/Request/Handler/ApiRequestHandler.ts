import {
  type ApiRequest,
  type ApiRequestWithInput,
  type ApiOperationResponse,
  type ShouldBeCanceled
} from '../../../../all';

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
