export interface ApiRequest {
  operationCode: string;
  operationName: string;
}

export function createApiRequest (options?: Partial<ApiRequest>): ApiRequest {
  return {
    operationCode: options?.operationCode ?? '',
    operationName: options?.operationName ?? ''
  };
}
