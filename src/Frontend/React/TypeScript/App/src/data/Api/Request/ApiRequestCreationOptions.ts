import { type ApiResponseFactory, type ApiResponseResource } from '../Response';

export interface ApiRequestCreationOptions {
  factoryOfApiResponse: ApiResponseFactory;
  operationCode?: string;
  operationName: string;
  resourceOfApiResponse: ApiResponseResource;
}
