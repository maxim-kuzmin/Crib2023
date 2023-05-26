import { useCallback } from 'react';
import { OperationStatus } from '../../../../../../common';
import {
  type TopicItemStoreSaveActionInput,
  type TopicItemStoreSaveActionOutput,
  type TopicItemStoreSaveCompletedActionResult,
  type TopicItemStoreSliceName,
} from '../../../../../../features';
import { useStoreSaveActionDispatch } from './TopicItemStoreSaveActionDispatchHook';
import { useStoreState } from '../../TopicItemStoreStateHook';

export function useStoreSaveActionOutput (
  sliceName: TopicItemStoreSliceName,
  input: TopicItemStoreSaveActionInput = {}
): TopicItemStoreSaveActionOutput {
  const { onActionCompleted } = input;

  const callback = useCallback(
    (data: TopicItemStoreSaveCompletedActionResult) => {
      if (onActionCompleted) {
        onActionCompleted(data);
      }
    },
    [onActionCompleted]
  );

  const dispatchOfSaveAction = useStoreSaveActionDispatch(sliceName, { callback });

  const { resultOfSaveCompletedAction, statusOfSaveAction } = useStoreState(sliceName);

  return {
    dispatchOfSaveAction,
    pendingOfSaveAction: statusOfSaveAction === OperationStatus.Pending,
    resultOfSaveCompletedAction,
  };
}
