import { createApiRequest, type ApiRequest } from './ApiRequest';

export interface ApiRequestWithInput<TInput> extends ApiRequest {
  input: TInput;
}

export function createApiRequestWithInput<TInput> (
  input: TInput,
  options?: Partial<ApiRequest>
): ApiRequestWithInput<TInput> {
  const apiRequest = createApiRequest(options);

  return {
    ...apiRequest,
    input
  }
}
