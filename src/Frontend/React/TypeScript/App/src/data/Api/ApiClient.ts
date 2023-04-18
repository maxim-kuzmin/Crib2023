import { type ApiOperationResponse, type ApiOperationResponseWithData } from './Operation';

export interface ApiClient {
  readonly delete: (
    endpoint: string,
    operationName: string,
    operationCode: string,
    query?: any
  ) => Promise<ApiOperationResponse>;

  readonly get: <TData>(
    endpoint: string,
    operationName: string,
    operationCode: string,
    query?: any
  ) => Promise<ApiOperationResponseWithData<TData>>;

  readonly post: <TData>(
    endpoint: string,
    operationName: string,
    operationCode: string,
    body: any,
    query?: any
  ) => Promise<ApiOperationResponseWithData<TData>>;

  readonly put: <TData>(
    endpoint: string,
    operationName: string,
    operationCode: string,
    body: any,
    query?: any
  ) => Promise<ApiOperationResponseWithData<TData>>;
}
