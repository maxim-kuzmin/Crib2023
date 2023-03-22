import {
  type ApiResponseDetailsData,
  type ApiResponseErrorsData
} from '../../all';

export interface ApiResult<TData> {
  readonly data?: TData | null;
  readonly error?: Error | null;
  readonly operationCode: string;
  readonly responseDetailsData?: ApiResponseDetailsData | null;
  readonly responseErrorsData?: ApiResponseErrorsData | null;
  readonly responseStatusCode?: number;
}
