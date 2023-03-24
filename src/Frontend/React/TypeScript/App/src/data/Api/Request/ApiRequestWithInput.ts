import { type ApiRequest } from '../../../all';

export interface ApiRequestWithInput<TInput> extends ApiRequest {
  input: TInput;
  operationCode: string;
  readonly operationName: string;
}

export function createApiRequestWithInput<TInput> (
  operationName: string,
  input: TInput,
  operationCode: string
): ApiRequestWithInput<TInput> {
  return {
    input,
    operationCode,
    operationName
  };
}
