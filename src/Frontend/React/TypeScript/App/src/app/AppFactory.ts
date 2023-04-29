import { type ApiFactory } from '../data';
import { createApiFactory } from '../data/Api/ApiFactory';

export interface AppFactory {
  readonly Api: ApiFactory;
}

export function createAppFactory (): AppFactory {
  const factoryOfApi = createApiFactory();

  return {
    Api: factoryOfApi
  };
}
