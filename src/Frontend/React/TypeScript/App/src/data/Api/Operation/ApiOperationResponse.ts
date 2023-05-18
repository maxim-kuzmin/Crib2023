import { type ApiResponseError } from '../Response';

export interface ApiOperationResponse {
  readonly error?: ApiResponseError | null;
  readonly operationCode: string;
  readonly operationName: string;
}

export function createApiOperationResponse (options?: Partial<ApiOperationResponse>): ApiOperationResponse {
  return {
    error: options?.error,
    operationCode: options?.operationCode ?? '',
    operationName: options?.operationName ?? '',
  }
}
