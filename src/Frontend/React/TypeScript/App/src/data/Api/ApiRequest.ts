export interface ApiRequest {
  operationCode: string;
  readonly operationName: string;
}

export function createApiRequest (operationName: string, operationCode: string): ApiRequest {
  return {
    operationCode,
    operationName
  };
}
