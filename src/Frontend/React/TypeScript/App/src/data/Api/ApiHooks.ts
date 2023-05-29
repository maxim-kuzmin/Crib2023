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
  readonly pathOfApiResponseResource: string;
}

class Implementation implements ApiHooks {
  readonly Request: ApiRequestHooks;
  readonly Response: ApiResponseHooks;

  constructor ({
    hooksOfOperation,
    pathOfApiResponseResource,
  }: Options) {
    this.Request = createApiRequestHooks({ hooksOfOperation });
    this.Response = createApiResponseHooks({ pathOfApiResponseResource });
  }
}

export function createApiHooks (options: Options): ApiHooks {
  return new Implementation(options);
}
