import { type ApiFactory } from '../data';
import { createApiFactory } from '../data/Api/ApiFactory';

export interface Factory {
  readonly Api: ApiFactory;
}

export function createFactory (): Factory {
  const factoryOfApi = createApiFactory();

  return {
    Api: factoryOfApi
  };
}
