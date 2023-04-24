import { type ApiResponseResource } from '../Response';

export interface ApiRequestOptions {
  endpoint: string;
  operationName: string;
  operationCode: string;
  query?: any;
  resourceOfApiResponse: ApiResponseResource;
}
