import { type OperationHooks } from '../common';
import { type ApiHooks, createApiHooks } from './Api';

export interface DataHooks {
  readonly Api: ApiHooks;
}

interface Options {
  readonly hooksOfOperation: OperationHooks;
  readonly pathOfApiResponseResource: string;
}

class Implementation implements DataHooks {
  readonly Api: ApiHooks;

  constructor ({
    hooksOfOperation,
    pathOfApiResponseResource,
  }: Options) {
    this.Api = createApiHooks({
      hooksOfOperation,
      pathOfApiResponseResource,
    });
  }
}

export function createDataHooks (options: Options): DataHooks {
  return new Implementation(options);
}
