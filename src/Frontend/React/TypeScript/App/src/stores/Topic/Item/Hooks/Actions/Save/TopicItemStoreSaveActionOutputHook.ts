import { useCallback } from 'react';
import {
  type TopicItemStoreSaveActionInput,
  type TopicItemStoreSaveActionOutput,
  type TopicItemStoreSaveCompletedActionPayload,
} from '../../../../../../app';
import { OperationStatus } from '../../../../../../common';
import { useStoreSaveActionDispatch } from './TopicItemStoreSaveActionDispatchHook';
import { useStoreState } from '../../TopicItemStoreStateHook';

export function useStoreSaveActionOutput (
  sliceName: string,
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
