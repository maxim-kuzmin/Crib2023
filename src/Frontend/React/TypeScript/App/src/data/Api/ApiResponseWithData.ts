import { type ApiResponse } from '../../all';

export interface ApiResponseWithData<TData> extends ApiResponse {
  readonly data: TData;
}
