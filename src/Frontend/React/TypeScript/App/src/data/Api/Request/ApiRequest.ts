import { type ApiResponseResource } from '../Response';
import { type ApiRequestCreationOptions } from './ApiRequestCreationOptions';

export interface ApiRequest {
  operationCode: string;
  operationName: string;
  resourceOfApiResponse: ApiResponseResource;
}

export function createApiRequest (options: ApiRequestCreationOptions): ApiRequest {
  const {
    operationCode,
    operationName,
    resourceOfApiResponse
  } = options;

  return {
    operationCode: operationCode ?? '',
    operationName,
    resourceOfApiResponse
  };
}
