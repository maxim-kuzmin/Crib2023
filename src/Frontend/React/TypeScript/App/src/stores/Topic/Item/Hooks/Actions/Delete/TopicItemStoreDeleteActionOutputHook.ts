import { useCallback } from 'react';
import {
  type TopicItemStoreDeleteActionInput,
  type TopicItemStoreDeleteActionOutput,
  type TopicItemStoreDeleteCompletedActionPayload,
} from '../../../../../../app/Stores';
import { OperationStatus } from '../../../../../../common';
import { useStoreState } from '../../TopicItemStoreStateHook';
import { useStoreDeleteActionDispatch } from './TopicItemStoreDeleteActionDispatchHook';

export function useStoreDeleteActionOutput (
  sliceName: string,
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
