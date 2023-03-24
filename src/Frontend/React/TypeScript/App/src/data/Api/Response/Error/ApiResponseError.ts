import {
  type ApiResponseDataWithMessages,
  type ApiResponseDataWithDetails
} from '../../../../all';

export interface ApiResponseError extends Error {
  readonly responseDataWithDetails: ApiResponseDataWithDetails | null;
  readonly responseDataWithMessages: ApiResponseDataWithMessages | null;
  readonly responseStatus: number;
}
