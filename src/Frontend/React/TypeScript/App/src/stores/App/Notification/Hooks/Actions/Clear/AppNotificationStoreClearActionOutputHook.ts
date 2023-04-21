import { useCallback } from 'react';
import {
  type AppNotificationStoreClearActionInput,
  type AppNotificationStoreClearActionOutput
} from '../../../../../../app/Stores';
import { StoreDispatchType } from '../../../../../../common';
import { useClearActionDispatch } from './AppNotificationStoreClearActionDispatchHook';

export function useClearActionOutput (
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

  const dispatchOfClearAction = useClearActionDispatch(
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
