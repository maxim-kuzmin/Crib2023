import { type ApiOperationResponse } from '../../../all';

export interface ApiClient {
  readonly delete: <TData>(
    endpoint: string,
    operationName: string,
    operationCode: string,
    query?: any
  ) => Promise<ApiOperationResponse<TData>>;

  readonly get: <TData>(
    endpoint: string,
    operationName: string,
    operationCode: string,
    query?: any
  ) => Promise<ApiOperationResponse<TData>>;

  readonly post: <TData>(
    endpoint: string,
    operationName: string,
    operationCode: string,
    body: any,
    query?: any
  ) => Promise<ApiOperationResponse<TData>>;

  readonly put: <TData>(
    endpoint: string,
    operationName: string,
    operationCode: string,
    body: any,
    query?: any
  ) => Promise<ApiOperationResponse<TData>>;
}