import { type ApiResponseResource } from '../Response';

export interface ApiRequestOptions {
  readonly abortSignal?: AbortSignal;
  readonly endpoint: string;
  readonly operationName: string;
  readonly operationCode: string;
  readonly query?: any;
  readonly resourceOfApiResponse: ApiResponseResource;
}
