import { type OperationHandlerConfig } from '../../../common';
import { type OperationHooks } from '../../../common/Operation/OperationHooks';
import { type ApiRequestHooks } from './ApiRequestHooks';
import { type ApiRequestHandler } from '.';
import { ApiRequestHandlerImpl } from './ApiRequestHandlerImpl';

interface HooksOptions {
  readonly hooksOfOperation: OperationHooks;
}

export function createApiRequestHooks ({
  hooksOfOperation
}: HooksOptions): ApiRequestHooks {
  function useHandler (config: OperationHandlerConfig): ApiRequestHandler {
    return new ApiRequestHandlerImpl({
      operationHandler: hooksOfOperation.useOperationHandler(config)
    });
  }

  return { useHandler };
}
