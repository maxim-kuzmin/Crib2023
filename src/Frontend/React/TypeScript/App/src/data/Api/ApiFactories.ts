import { type ApiResponseFactory, createApiResponseFactory } from '.';

export interface ApiFactories {
  readonly Response: ApiResponseFactory;
}

class Implementation implements ApiFactories {
  readonly Response: ApiResponseFactory;

  constructor () {
    this.Response = createApiResponseFactory();
  }
}

export function createApiFactories (): ApiFactories {
  return new Implementation();
}
