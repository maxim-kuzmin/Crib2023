import { type ApiFactory } from './Api';
import { createApiFactory } from './Api/ApiFactory';

export interface DataFactory {
  readonly Api: ApiFactory;
}

export function createDataFactory (): DataFactory {
  const factoryOfApi = createApiFactory();

  return {
    Api: factoryOfApi,
  }
}
