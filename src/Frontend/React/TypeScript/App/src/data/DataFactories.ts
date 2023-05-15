import { type ApiFactories, createApiFactories } from './Api';

export interface DataFactories {
  readonly Api: ApiFactories;
}

class Implementation implements DataFactories {
  readonly Api: ApiFactories;

  constructor () {
    this.Api = createApiFactories();
  }
}
export function createDataFactories (): DataFactories {
  return new Implementation();
}
