import { AppNotificationStoreSliceName, type AppNotificationStoreHooks } from '../../app';
import { type OperationHandler } from './OperationHandler';
import { type OperationHandlerConfig } from './OperationHandlerConfig';
import { OperationHandlerImpl } from './OperationHandlerImpl';
import { type OperationHooks } from './OperationHooks';

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
