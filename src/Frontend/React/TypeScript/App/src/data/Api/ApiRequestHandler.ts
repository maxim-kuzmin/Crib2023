import {
  type ApiRequest,
  type ApiRequestWithInput,
  type ApiResult
} from '../../all';

export interface ApiRequestHandler {
  readonly handleWithInput: <
    TInput,
    TRequest extends ApiRequestWithInput<TInput>,
    TOutput,
    TResponse extends ApiResult<TOutput>
  > (
    request: TRequest,
    getResult: () => Promise<TResponse>
  ) => Promise<TResponse | null>;

  readonly handleWithoutInput: <
    TRequest extends ApiRequest,
    TOutput,
    TResponse extends ApiResult<TOutput>
  >(
    request: TRequest,
    getResult: () => Promise<TResponse>
  ) => Promise<TResponse | null>;
}
