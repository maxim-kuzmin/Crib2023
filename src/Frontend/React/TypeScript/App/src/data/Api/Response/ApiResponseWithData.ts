import { type ApiResponse } from './ApiResponse';

export interface ApiResponseWithData<TData> extends ApiResponse {
  readonly data: TData;
}
