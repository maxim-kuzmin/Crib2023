import { AppNotificationStoreSliceName, type AppNotificationStoreHooks } from '../../app';
import { type OperationHandler } from './OperationHandler';
import { type OperationHandlerConfig } from './OperationHandlerConfig';
import { OperationHandlerImpl } from './OperationHandlerImpl';

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
      AppNotificationStoreSliceName.AppNotificationView,
      {}
    );

    return new OperationHandlerImpl({
      functionToSetNotification: run,
      shouldBeLogged,
      shouldBeNotified
    });
  }

  return { useOperationHandler };
}
