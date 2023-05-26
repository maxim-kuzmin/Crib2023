import { useCallback } from 'react';
import {
  type AppNotificationStoreSetActionInput,
  type AppNotificationStoreSetActionOutput,
  type AppNotificationStoreSetActionResult,
  type AppNotificationStoreSliceName,
} from '../../../../../../features';
import { useStoreState } from '../../AppNotificationStoreStateHook';
import { useStoreSetActionDispatch } from './AppNotificationStoreSetActionDispatchHook';

export function useStoreSetActionOutput (
  sliceName: AppNotificationStoreSliceName,
  input: AppNotificationStoreSetActionInput
): AppNotificationStoreSetActionOutput {
  const { onActionCompleted } = input;

  const callback = useCallback(
    (data: AppNotificationStoreSetActionResult) => {
      if (onActionCompleted) {
        onActionCompleted(data);
      }
    },
    [onActionCompleted]
  );

  const dispatchOfSetAction = useStoreSetActionDispatch(sliceName, { callback });

  const { resultOfSetAction } = useStoreState(sliceName);

  return {
    dispatchOfSetAction,
    resultOfSetAction,
  };
}
