import { type FunctionToSetNotification } from '../CommonFunctions';
import { type OperationHandler, createOperationHandler } from './OperationHandler';
import { type OperationHandlerConfig } from './OperationHandlerConfig';

export interface OperationHooks {
  readonly useOperationHandler: (config: OperationHandlerConfig) => OperationHandler;
}

interface Options {
  readonly useFunctionToSetNotification: () => FunctionToSetNotification;
}

export function createOperationHooks ({
  useFunctionToSetNotification
}: Options): OperationHooks {
  function useOperationHandler (config: OperationHandlerConfig): OperationHandler {
    const { shouldBeLogged, shouldBeNotified } = config;

    const functionToSetNotification = useFunctionToSetNotification();

    return createOperationHandler({
      functionToSetNotification,
      shouldBeLogged,
      shouldBeNotified
    });
  }

  return { useOperationHandler };
}
