import { type ApiFactories } from './Api';
import { createApiFactories } from './Api/ApiFactories';

export interface DataFactories {
  readonly Api: ApiFactories;
}

export function createDataFactories (): DataFactories {
  const factoriesOfApi = createApiFactories();

  return {
    Api: factoriesOfApi,
  }
}
