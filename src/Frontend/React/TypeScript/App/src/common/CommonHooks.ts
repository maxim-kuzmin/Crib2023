import { type AppNotificationStoreHooks } from '../features';
import { type ConfirmControlComponent, type ConfirmControlHooks } from './Controls';
import { useLeaveFormBlocker as useLeaveFormBlockerInner } from './Hooks/LeaveFormBlockerHook';
import { type OperationHooks } from './Operation';
import { createOperationHooks } from './Operation/OperationHooks';

export interface CommonHooks {
  readonly Operation: OperationHooks;
  readonly useLeaveFormBlocker: (shouldBlock: boolean) => void;
}

interface Options {
  readonly componentOfConfirmControl: ConfirmControlComponent;
  readonly hooksOfAppNotificationStore: AppNotificationStoreHooks;
  readonly hooksOfConfirmControl: ConfirmControlHooks;
}

export function createCommonHooks ({
  componentOfConfirmControl,
  hooksOfAppNotificationStore,
  hooksOfConfirmControl,
}: Options): CommonHooks {
  const hooksOfOperation = createOperationHooks({
    hooksOfAppNotificationStore
  });

  function useLeaveFormBlocker (shouldBlock: boolean) {
    useLeaveFormBlockerInner({
      componentOfConfirmControl,
      hooksOfConfirmControl,
      shouldBlock
    });
  }

  return {
    Operation: hooksOfOperation,
    useLeaveFormBlocker,
  };
}
