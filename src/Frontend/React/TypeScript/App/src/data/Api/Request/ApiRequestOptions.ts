import { type ApiResponseResource } from '../Response';

export interface ApiRequestOptions {
  abortController?: AbortController;
  endpoint: string;
  operationName: string;
  operationCode: string;
  query?: any;
  resourceOfApiResponse: ApiResponseResource;
}
