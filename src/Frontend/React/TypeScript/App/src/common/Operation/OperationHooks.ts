import { type SetNotification } from '../CommonFunctions';
import { type OperationHandler, createOperationHandler } from './OperationHandler';
import { type OperationHandlerConfig } from './OperationHandlerConfig';

export interface OperationHooks {
  readonly useOperationHandler: (config: OperationHandlerConfig) => OperationHandler;
}

interface Options {
  readonly getFunctionToSetNotification: () => SetNotification;
}

export function createOperationHooks ({
  getFunctionToSetNotification
}: Options): OperationHooks {
  function useOperationHandler (config: OperationHandlerConfig): OperationHandler {
    const { shouldBeLogged, shouldBeNotified } = config;

    const functionToSetNotification = getFunctionToSetNotification();

    return createOperationHandler({
      functionToSetNotification,
      shouldBeLogged,
      shouldBeNotified
    });
  }

  return { useOperationHandler };
}
