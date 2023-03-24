import {
  type ApiResponseDataWithMessages,
  type ApiResponseDataWithDetails
} from '../../../../all';

export interface ApiResponseErrorOptions extends ErrorOptions {
  readonly responseDataWithDetails?: ApiResponseDataWithDetails | null;
  readonly responseDataWithMessages?: ApiResponseDataWithMessages | null;
}
