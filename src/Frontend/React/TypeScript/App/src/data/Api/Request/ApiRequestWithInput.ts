import { type ApiRequest } from './ApiRequest';

export interface ApiRequestWithInput<TInput> extends ApiRequest {
  input: TInput;
  operationCode: string;
  readonly operationName: string;
}
