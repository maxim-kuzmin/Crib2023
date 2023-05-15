import { type OperationHooks } from '../../common';
import {
  type ApiRequestHooks,
  type ApiResponseHooks,
  createApiResponseHooks,
  createApiRequestHooks,
} from '.';

export interface ApiHooks {
  readonly Request: ApiRequestHooks;
  readonly Response: ApiResponseHooks;
}

interface Options {
  readonly hooksOfOperation: OperationHooks;
}

class Implementation implements ApiHooks {
  readonly Request: ApiRequestHooks;
  readonly Response: ApiResponseHooks;

  constructor ({
    hooksOfOperation
  }: Options) {
    this.Request = createApiRequestHooks({ hooksOfOperation });
    this.Response = createApiResponseHooks();
  }
}

export function createApiHooks (options: Options): ApiHooks {
  return new Implementation(options);
}
