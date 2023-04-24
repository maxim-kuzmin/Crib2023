import { useCallback } from 'react';
import {
  type AppNotificationStoreClearActionInput,
  type AppNotificationStoreClearActionOutput
} from '../../../../../../app';
import { StoreDispatchType } from '../../../../../../common';
import { useStoreClearActionDispatch } from './AppNotificationStoreClearActionDispatchHook';

export function useStoreClearActionOutput (
  sliceName: string,
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
