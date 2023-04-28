import {
  type ApiResponseFactory,
  createApiResponseFactory,
} from '../data/Api/Response/ApiResponseFactory'

export interface Factory {
  readonly Api: {
    readonly Response: ApiResponseFactory;
  };
}

export function createFactory (): Factory {
  const factoryOfApiResponse = createApiResponseFactory();

  return {
    Api: {
      Response: factoryOfApiResponse
    }
  };
}
