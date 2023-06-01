import { createApiRequest, type ApiRequest } from '../ApiRequest';
import { type ApiRequestCreationOptions } from './ApiRequestCreationOptions';

export interface ApiRequestWithInput<TInput> extends ApiRequest {
  input: TInput;
}

export function createApiRequestWithInput<TInput> (
  input: TInput,
  options: ApiRequestCreationOptions
): ApiRequestWithInput<TInput> {
  const apiRequest = createApiRequest(options);

  return {
    ...apiRequest,
    input
  };
}
