import { useCallback } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type AppNotificationStoreClearActionInput,
  type AppNotificationStoreClearActionOutput,
  type AppNotificationStoreSliceName,
} from '../../../../../../features';
import { useStoreClearActionDispatch } from './AppNotificationStoreClearActionDispatchHook';

export function useStoreClearActionOutput (
  sliceName: AppNotificationStoreSliceName,
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
    sliceName,
    {
      callback,
      dispatchType: StoreDispatchType.Unmount
    }
  );

  return {
    dispatchOfClearAction
  };
}
