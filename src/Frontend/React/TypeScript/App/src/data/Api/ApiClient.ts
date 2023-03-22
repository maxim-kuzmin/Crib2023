import { type ApiResult } from '../../all';

export interface ApiClient {
  readonly delete: <TData>(
    endpoint: string,
    operationCode: string,
    query?: any
  ) => Promise<ApiResult<TData>>;

  readonly get: <TData>(
    endpoint: string,
    operationCode: string,
    query?: any
  ) => Promise<ApiResult<TData>>;

  readonly post: <TData>(
    endpoint: string,
    operationCode: string,
    body: any,
    query?: any
  ) => Promise<ApiResult<TData>>;

  readonly put: <TData>(
    endpoint: string,
    operationCode: string,
    body: any,
    query?: any
  ) => Promise<ApiResult<TData>>;
}
