import { type OperationHooks } from '../../common';
import { type ApiRequestHooks } from './Request';
import { createApiRequestHooks } from './Request/ApiRequestHooks';
import { type ApiResponseHooks } from './Response';
import { createApiResponseHooks } from './Response/ApiResponseHooks';

export interface ApiHooks {
  readonly Request: ApiRequestHooks;
  readonly Response: ApiResponseHooks;
}

interface Options {
  readonly hooksOfOperation: OperationHooks;
}

export function createApiHooks ({
  hooksOfOperation
}: Options): ApiHooks {
  const hooksOfRequest = createApiRequestHooks({ hooksOfOperation });
  const hooksOfResponse = createApiResponseHooks();

  return {
    Request: hooksOfRequest,
    Response: hooksOfResponse,
  };
}
