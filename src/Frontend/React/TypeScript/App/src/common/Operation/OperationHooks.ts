import { type AppNotificationStoreHooks, AppNotificationStoreSliceName } from '../../features';
import { type OperationHandler, createOperationHandler } from './OperationHandler';
import { type OperationHandlerConfig } from './OperationHandlerConfig';

export interface OperationHooks {
  readonly useOperationHandler: (config: OperationHandlerConfig) => OperationHandler;
}

interface HooksOptions {
  readonly hooksOfAppNotificationStore: AppNotificationStoreHooks;
}

export function createOperationHooks ({
  hooksOfAppNotificationStore
}: HooksOptions): OperationHooks {
  function useOperationHandler (config: OperationHandlerConfig): OperationHandler {
    const { shouldBeLogged, shouldBeNotified } = config;

    const { run } = hooksOfAppNotificationStore.useStoreSetActionDispatch(
      AppNotificationStoreSliceName.Default,
      {}
    );

    return createOperationHandler({
      functionToSetNotification: run,
      shouldBeLogged,
      shouldBeNotified
    });
  }

  return { useOperationHandler };
}
