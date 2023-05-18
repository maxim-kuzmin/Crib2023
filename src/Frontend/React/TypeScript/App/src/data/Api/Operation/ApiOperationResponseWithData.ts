import { type ApiOperationResponse, createApiOperationResponse } from './ApiOperationResponse';

export interface ApiOperationResponseWithData<TData> extends ApiOperationResponse {
  readonly data?: TData | null;
}

export function createApiOperationResponseWithData<TData> (
  options?: ApiOperationResponseWithData<TData>
): ApiOperationResponseWithData<TData> {
  const base = createApiOperationResponse(options);

  return {
    ...base,
    data: options?.data
  };
}
