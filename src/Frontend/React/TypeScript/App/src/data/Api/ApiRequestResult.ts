import {
  type ApiResponseDetailsData,
  type ApiResponseErrorsData
} from '../../all';

export interface ApiRequestResult<TData> {
  readonly data?: TData | null;
  readonly operationCode?: string;
  readonly responseDetailsData?: ApiResponseDetailsData | null;
  readonly responseErrorsData?: ApiResponseErrorsData | null;
  readonly responseStatusCode?: number;
}
