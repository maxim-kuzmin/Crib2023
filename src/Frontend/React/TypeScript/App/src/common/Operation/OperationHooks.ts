import { useAppInstance } from '../../app';
import { type FunctionToSetNotification } from '../CommonFunctions';
import { type OperationHandlerConfig, type OperationHandlerHooks, createOperationHandlerHooks } from './Handler';
import { type OperationHandler, createOperationHandler } from './OperationHandler';

export interface OperationHooks {
  readonly Handler: OperationHandlerHooks;
  readonly useOperationHandler: (config: OperationHandlerConfig) => OperationHandler;
}

interface Options {
  readonly pathOfOperationHandlerResource: string;
  readonly useFunctionToSetNotification: () => FunctionToSetNotification;
}

export function createOperationHooks ({
  pathOfOperationHandlerResource,
  useFunctionToSetNotification
}: Options): OperationHooks {
  function useOperationHandler (config: OperationHandlerConfig): OperationHandler {
    const { hooks } = useAppInstance();

    const { shouldBeLogged, shouldBeNotified } = config;

    const resourceOfOperationHandler = hooks.Common.Operation.Handler.useResource();

    const functionToSetNotification = useFunctionToSetNotification();

    return createOperationHandler({
      functionToSetNotification,
      resourceOfOperationHandler,
      shouldBeLogged,
      shouldBeNotified
    });
  }

  return {
    Handler: createOperationHandlerHooks({ pathOfOperationHandlerResource }),
    useOperationHandler
  };
}
