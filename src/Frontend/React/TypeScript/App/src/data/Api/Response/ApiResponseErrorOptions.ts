import { type ApiResponseResource } from './ApiResponseResource';
import { type ApiResponseDataWithDetails, type ApiResponseDataWithMessages } from './Data';

export interface ApiResponseErrorOptions extends ErrorOptions {
  readonly errorMessage?: string;
  readonly responseStatus?: number;
  readonly resourceOfApiResponse: ApiResponseResource;
  readonly responseDataWithDetails?: ApiResponseDataWithDetails | null;
  readonly responseDataWithMessages?: ApiResponseDataWithMessages | null;
}
