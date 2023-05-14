import { useCallback } from 'react';
import { OperationStatus } from '../../../../../../common';
import {
  type TopicItemStoreSliceName,
  type TopicItemStoreSaveActionInput,
  type TopicItemStoreSaveActionOutput,
  type TopicItemStoreSaveCompletedActionPayload,
} from '../../../../../../features';
import { useStoreSaveActionDispatch } from './TopicItemStoreSaveActionDispatchHook';
import { useStoreState } from '../../TopicItemStoreStateHook';

export function useStoreSaveActionOutput (
  sliceName: TopicItemStoreSliceName,
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

  const dispatchOfSaveAction = useStoreSaveActionDispatch(sliceName, { callback });

  const { payloadOfSaveCompletedAction, statusOfSaveAction } = useStoreState(sliceName);

  return {
    dispatchOfSaveAction,
    payloadOfSaveCompletedAction,
    pendingOfSaveAction: statusOfSaveAction === OperationStatus.Pending
  };
}
