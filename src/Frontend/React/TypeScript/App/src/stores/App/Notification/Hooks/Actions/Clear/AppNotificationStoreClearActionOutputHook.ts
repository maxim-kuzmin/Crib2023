import { useCallback } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type AppNotificationStoreSlice,
  type AppNotificationStoreClearActionInput,
  type AppNotificationStoreClearActionOutput
} from '../../../../../../features';
import { useStoreClearActionDispatch } from './AppNotificationStoreClearActionDispatchHook';

export function useStoreClearActionOutput (
  slice: AppNotificationStoreSlice,
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
    slice,
    {
      callback,
      dispatchType: StoreDispatchType.Unmount
    }
  );

  return {
    dispatchOfClearAction
  };
}
