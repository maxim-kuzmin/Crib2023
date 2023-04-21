import { useCallback } from 'react';
import {
  type AppNotificationStoreSetActionInput,
  type AppNotificationStoreSetActionOutput,
  type AppNotificationStoreSetActionPayload,
} from '../../../../../../app/Stores';
import { useStoreState } from '../../AppNotificationStoreStateHook';
import { useSetActionDispatch } from './AppNotificationStoreSetActionDispatchHook';

export function useSetActionOutput (
  sliceName: string,
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

  const dispatchOfSetAction = useSetActionDispatch(sliceName, { callback });

  const { payloadOfSetAction } = useStoreState(sliceName);

  return {
    dispatchOfSetAction,
    payloadOfSetAction
  };
}
