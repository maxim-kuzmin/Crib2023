import { type ApiResponseDataWithDetails, type ApiResponseDataWithMessages } from './Data';

export interface ApiResponseErrorOptions extends ErrorOptions {
  readonly responseDataWithDetails?: ApiResponseDataWithDetails | null;
  readonly responseDataWithMessages?: ApiResponseDataWithMessages | null;
}
