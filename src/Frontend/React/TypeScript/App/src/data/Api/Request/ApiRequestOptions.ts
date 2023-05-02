import { type ApiResponseFactory, type ApiResponseResource } from '../Response';

export interface ApiRequestOptions {
  endpoint: string;
  factoryOfApiResponse: ApiResponseFactory;
  operationName: string;
  operationCode: string;
  query?: any;
  resourceOfApiResponse: ApiResponseResource;
}
