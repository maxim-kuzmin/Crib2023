import { type ApiRequest } from '../../all';

export interface ApiRequestWithInput<TInput> extends ApiRequest {
  readonly input: TInput;
}
