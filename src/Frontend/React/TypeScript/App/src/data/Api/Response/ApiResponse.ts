export interface ApiResponse {
  readonly operationCode: string;
}

export function createApiResponse (options: Partial<ApiResponse>): ApiResponse {
  return {
    operationCode: options?.operationCode ?? ''
  };
}
