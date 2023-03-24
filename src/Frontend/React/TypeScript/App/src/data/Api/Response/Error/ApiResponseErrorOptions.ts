import {
  type ApiResponseErrorsData,
  type ApiResponseDetailsData
} from '../../../../all';

export interface ApiResponseErrorOptions extends ErrorOptions {
  readonly responseDetailsData?: ApiResponseDetailsData | null;
  readonly responseErrorsData?: ApiResponseErrorsData | null;
}
