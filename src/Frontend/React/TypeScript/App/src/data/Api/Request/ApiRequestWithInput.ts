import { type ApiRequest } from '../../../all';

export interface ApiRequestWithInput<TInput> extends ApiRequest {
  input: TInput;
  operationCode: string;
  readonly operationName: string;
}
