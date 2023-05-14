import { useCallback } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type AppNotificationStoreOwner,
  type AppNotificationStoreClearActionInput,
  type AppNotificationStoreClearActionOutput
} from '../../../../../../features';
import { useStoreClearActionDispatch } from './AppNotificationStoreClearActionDispatchHook';

export function useStoreClearActionOutput (
  owner: AppNotificationStoreOwner,
  input: AppNotificationStoreClearActionInput
): AppNotificationStoreClearActionOutput {
  const { onActionCompleted } = input;

  const callback = useCallback(
    () => {
      if (onActionCompleted) {
        onActionCompleted();
      }
    },
    [onActionCompleted]
  );

  const dispatchOfClearAction = useStoreClearActionDispatch(
    owner,
    {
      callback,
      dispatchType: StoreDispatchType.Unmount
    }
  );

  return {
    dispatchOfClearAction
  };
}
