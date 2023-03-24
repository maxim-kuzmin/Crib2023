import {
  type ApiResponseErrorsData,
  type ApiResponseDetailsData
} from '../../../all';

export interface ApiResponseError extends Error {
  readonly responseDetailsData: ApiResponseDetailsData | null;
  readonly responseErrorsData: ApiResponseErrorsData | null;
}
