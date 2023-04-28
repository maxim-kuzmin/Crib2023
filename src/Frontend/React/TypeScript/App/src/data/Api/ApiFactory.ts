import {
  type ApiResponseFactory,
  createApiResponseFactory,
} from './Response/ApiResponseFactory'

export interface ApiFactory {
  readonly Response: ApiResponseFactory;
}

export function createApiFactory (): ApiFactory {
  const factoryOfApiResponse = createApiResponseFactory();

  return {
    Response: factoryOfApiResponse
  };
}
