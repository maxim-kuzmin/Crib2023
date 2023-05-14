import { useCallback } from 'react';
import {
  type AppNotificationStoreSlice,
  type AppNotificationStoreSetActionInput,
  type AppNotificationStoreSetActionOutput,
  type AppNotificationStoreSetActionPayload,
} from '../../../../../../features';
import { useStoreState } from '../../AppNotificationStoreStateHook';
import { useStoreSetActionDispatch } from './AppNotificationStoreSetActionDispatchHook';

export function useStoreSetActionOutput (
  slice: AppNotificationStoreSlice,
  input: AppNotificationStoreSetActionInput
): AppNotificationStoreSetActionOutput {
  const { onActionCompleted } = input;

  const callback = useCallback(
    (payload: AppNotificationStoreSetActionPayload) => {
      if (onActionCompleted) {
        onActionCompleted(payload);
      }
    },
    [onActionCompleted]
  );

  const dispatchOfSetAction = useStoreSetActionDispatch(slice, { callback });

  const { payloadOfSetAction } = useStoreState(slice);

  return {
    dispatchOfSetAction,
    payloadOfSetAction
  };
}
