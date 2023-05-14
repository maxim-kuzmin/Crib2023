import { useCallback } from 'react';
import { OperationStatus } from '../../../../../../common';
import {
  type TopicItemStoreSlice,
  type TopicItemStoreDeleteActionInput,
  type TopicItemStoreDeleteActionOutput,
  type TopicItemStoreDeleteCompletedActionPayload,
} from '../../../../../../features';
import { useStoreState } from '../../TopicItemStoreStateHook';
import { useStoreDeleteActionDispatch } from './TopicItemStoreDeleteActionDispatchHook';

export function useStoreDeleteActionOutput (
  slice: TopicItemStoreSlice,
  input: TopicItemStoreDeleteActionInput = {}
): TopicItemStoreDeleteActionOutput {
  const { onActionCompleted } = input;

  const callback = useCallback(
    (payload: TopicItemStoreDeleteCompletedActionPayload) => {
      if (onActionCompleted) {
        onActionCompleted(payload);
      }
    },
    [onActionCompleted]
  );

  const dispatchOfDeleteAction = useStoreDeleteActionDispatch(slice, { callback });

  const { payloadOfDeleteCompletedAction, statusOfDeleteAction } = useStoreState(slice);

  return {
    dispatchOfDeleteAction,
    payloadOfDeleteCompletedAction,
    pendingOfDeleteAction: statusOfDeleteAction === OperationStatus.Pending
  };
}
