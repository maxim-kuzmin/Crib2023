import { type ApiOperationResponse } from './ApiOperationResponse';

export interface ApiOperationResponseWithData<TData> extends ApiOperationResponse {
  readonly data?: TData | null;
}
