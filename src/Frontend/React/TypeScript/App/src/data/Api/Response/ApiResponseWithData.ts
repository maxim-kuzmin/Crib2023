import { createApiResponse, type ApiResponse } from './ApiResponse';

export interface ApiResponseWithData<TData> extends ApiResponse {
  readonly data: TData;
}

interface Options<TData> extends Omit<ApiResponseWithData<TData>, 'operationCode'> {
  readonly operationCode?: string;
}
export function createApiResponseWithData<TData> (options: Options<TData>): ApiResponseWithData<TData> {
  const { data } = options;

  const base = createApiResponse(options);

  return {
    ...base,
    data,
  };
}
