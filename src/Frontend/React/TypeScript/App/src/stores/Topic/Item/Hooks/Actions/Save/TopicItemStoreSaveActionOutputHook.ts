import { useCallback } from 'react';
import { OperationStatus } from '../../../../../../common';
import {
  type TopicItemStoreSlice,
  type TopicItemStoreSaveActionInput,
  type TopicItemStoreSaveActionOutput,
  type TopicItemStoreSaveCompletedActionPayload,
} from '../../../../../../features';
import { useStoreSaveActionDispatch } from './TopicItemStoreSaveActionDispatchHook';
import { useStoreState } from '../../TopicItemStoreStateHook';

export function useStoreSaveActionOutput (
  slice: TopicItemStoreSlice,
  input: TopicItemStoreSaveActionInput = {}
): TopicItemStoreSaveActionOutput {
  const { onActionCompleted } = input;

  const callback = useCallback(
    (payload: TopicItemStoreSaveCompletedActionPayload) => {
      if (onActionCompleted) {
        onActionCompleted(payload);
      }
    },
    [onActionCompleted]
  );

  const dispatchOfSaveAction = useStoreSaveActionDispatch(slice, { callback });

  const { payloadOfSaveCompletedAction, statusOfSaveAction } = useStoreState(slice);

  return {
    dispatchOfSaveAction,
    payloadOfSaveCompletedAction,
    pendingOfSaveAction: statusOfSaveAction === OperationStatus.Pending
  };
}
