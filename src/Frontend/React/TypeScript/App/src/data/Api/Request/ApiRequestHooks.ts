import { type OperationHandlerConfig } from '../../../common';
import { type OperationHooks } from '../../../common/Operation/OperationHooks';
import { type ApiRequestHandler, createApiRequestHandler } from './ApiRequestHandler';

export interface ApiRequestHooks {
  readonly useHandler: (config: OperationHandlerConfig) => ApiRequestHandler;
}

interface Options {
  readonly hooksOfOperation: OperationHooks;
}

export function createApiRequestHooks ({
  hooksOfOperation
}: Options): ApiRequestHooks {
  function useHandler (config: OperationHandlerConfig): ApiRequestHandler {
    return createApiRequestHandler({
      operationHandler: hooksOfOperation.useOperationHandler(config)
    });
  }

  return { useHandler };
}
