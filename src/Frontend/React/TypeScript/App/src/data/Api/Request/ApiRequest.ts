import { type ApiResponseFactory, type ApiResponseResource } from '../Response';
import { type ApiRequestCreationOptions } from './ApiRequestCreationOptions';

export interface ApiRequest {
  factoryOfApiResponse: ApiResponseFactory;
  operationCode: string;
  operationName: string;
  resourceOfApiResponse: ApiResponseResource;
}

export function createApiRequest (options: ApiRequestCreationOptions): ApiRequest {
  const {
    factoryOfApiResponse,
    operationCode,
    operationName,
    resourceOfApiResponse
  } = options;

  return {
    factoryOfApiResponse,
    operationCode: operationCode ?? '',
    operationName,
    resourceOfApiResponse
  };
}
