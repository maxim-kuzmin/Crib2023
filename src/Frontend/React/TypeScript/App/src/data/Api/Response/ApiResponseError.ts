import { type ApiResponseDataWithDetails, type ApiResponseDataWithMessages } from './Data';

export interface ApiResponseError extends Error {
  readonly responseDataWithDetails: ApiResponseDataWithDetails | null;
  readonly responseDataWithMessages: ApiResponseDataWithMessages | null;
  readonly responseStatus: number;
}
