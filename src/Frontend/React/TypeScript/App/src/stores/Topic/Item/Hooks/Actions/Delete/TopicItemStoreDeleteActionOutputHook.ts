import { useCallback } from 'react';
import { OperationStatus } from '../../../../../../common';
import {
  type TopicItemStoreSliceName,
  type TopicItemStoreDeleteActionInput,
  type TopicItemStoreDeleteActionOutput,
  type TopicItemStoreDeleteCompletedActionPayload,
} from '../../../../../../features';
import { useStoreState } from '../../TopicItemStoreStateHook';
import { useStoreDeleteActionDispatch } from './TopicItemStoreDeleteActionDispatchHook';

export function useStoreDeleteActionOutput (
  sliceName: TopicItemStoreSliceName,
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

  const dispatchOfDeleteAction = useStoreDeleteActionDispatch(sliceName, { callback });

  const { payloadOfDeleteCompletedAction, statusOfDeleteAction } = useStoreState(sliceName);

  return {
    dispatchOfDeleteAction,
    payloadOfDeleteCompletedAction,
    pendingOfDeleteAction: statusOfDeleteAction === OperationStatus.Pending
  };
}
