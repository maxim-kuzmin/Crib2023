import { type OperationHooks } from '../common';
import { type ApiHooks } from './Api';
import { createApiHooks } from './Api/ApiHooks';

export interface DataHooks {
  readonly Api: ApiHooks;
}

interface Options {
  readonly hooksOfOperation: OperationHooks;
}

export function createDataHooks ({
  hooksOfOperation
}: Options): DataHooks {
  const hooksOfApi = createApiHooks({
    hooksOfOperation
  });

  return {
    Api: hooksOfApi,
  };
}
