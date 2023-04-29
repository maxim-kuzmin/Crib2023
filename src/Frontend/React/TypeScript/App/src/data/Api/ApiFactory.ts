import {
  type ApiResponseFactory,
  createApiResponseFactory,
} from './Response/ApiResponseFactory'

export interface ApiFactory {
  readonly Response: ApiResponseFactory;
}

export function createApiFactory (): ApiFactory {
  const factoryOfResponse = createApiResponseFactory();

  return {
    Response: factoryOfResponse
  };
}
