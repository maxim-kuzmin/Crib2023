import { type ApiOperationResponse, type ApiOperationResponseWithData } from './Operation';
import { type ApiRequestOptionsWithBody, type ApiRequestOptions } from './Request';

export interface ApiClient {
  readonly delete: (options: ApiRequestOptions) => Promise<ApiOperationResponse>;
  readonly get: <TData>(options: ApiRequestOptions) => Promise<ApiOperationResponseWithData<TData>>;
  readonly post: <TData>(options: ApiRequestOptionsWithBody) => Promise<ApiOperationResponseWithData<TData>>;
  readonly put: <TData>(options: ApiRequestOptionsWithBody) => Promise<ApiOperationResponseWithData<TData>>;
}
