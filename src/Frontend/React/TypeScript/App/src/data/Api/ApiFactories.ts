import { type ApiResponseFactory } from '.';
import { createApiResponseFactory } from './Response/ApiResponseFactory'

export interface ApiFactories {
  readonly Response: ApiResponseFactory;
}

export function createApiFactories (): ApiFactories {
  const factoryOfResponse = createApiResponseFactory();

  return {
    Response: factoryOfResponse
  };
}
