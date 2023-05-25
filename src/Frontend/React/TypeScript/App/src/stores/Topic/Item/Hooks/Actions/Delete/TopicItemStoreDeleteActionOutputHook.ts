import { useCallback } from 'react';
import { OperationStatus } from '../../../../../../common';
import {
  type TopicItemStoreSliceName,
  type TopicItemStoreDeleteActionInput,
  type TopicItemStoreDeleteActionOutput,
  type TopicItemStoreDeleteCompletedActionResult,
} from '../../../../../../features';
import { useStoreState } from '../../TopicItemStoreStateHook';
import { useStoreDeleteActionDispatch } from './TopicItemStoreDeleteActionDispatchHook';

export function useStoreDeleteActionOutput (
  sliceName: TopicItemStoreSliceName,
  input: TopicItemStoreDeleteActionInput = {}
): TopicItemStoreDeleteActionOutput {
  const { onActionCompleted } = input;

  const callback = useCallback(
    (data: TopicItemStoreDeleteCompletedActionResult) => {
      if (onActionCompleted) {
        onActionCompleted(data);
      }
    },
    [onActionCompleted]
  );

  const dispatchOfDeleteAction = useStoreDeleteActionDispatch(sliceName, { callback });

  const { resultOfDeleteCompletedAction, statusOfDeleteAction } = useStoreState(sliceName);

  return {
    dispatchOfDeleteAction,
    pendingOfDeleteAction: statusOfDeleteAction === OperationStatus.Pending,
    resultOfDeleteCompletedAction,
  };
}
