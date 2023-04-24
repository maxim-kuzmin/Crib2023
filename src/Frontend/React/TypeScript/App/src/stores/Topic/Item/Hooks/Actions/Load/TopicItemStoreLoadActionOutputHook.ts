import { useCallback } from 'react';
import {
  type TopicItemStoreLoadActionInput,
  type TopicItemStoreLoadActionOutput,
  type TopicItemStoreLoadCompletedActionPayload,
} from '../../../../../../app/Stores';
import { StoreDispatchType, OperationStatus } from '../../../../../../common';
import { useStoreState } from '../../TopicItemStoreStateHook';
import { useStoreLoadActionDispatch } from './TopicItemStoreLoadActionDispatchHook';

export function useStoreLoadActionOutput (
  sliceName: string,
  input: TopicItemStoreLoadActionInput
): TopicItemStoreLoadActionOutput {
  const { isCanceled, onActionCompleted, payloadOfLoadAction } = input;

  const callback = useCallback(
    (payload: TopicItemStoreLoadCompletedActionPayload) => {
      if (onActionCompleted) {
        onActionCompleted(payload);
      }
    },
    [onActionCompleted]
  );

  const dispatchOfLoadAction = useStoreLoadActionDispatch(
    sliceName,
    {
      callback,
      dispatchType: StoreDispatchType.MountOrUpdate,
      isCanceled,
      payloadOfLoadAction
    }
  );

  const { payloadOfLoadCompletedAction, statusOfLoadAction } = useStoreState(sliceName);

  return {
    dispatchOfLoadAction,
    payloadOfLoadCompletedAction,
    pendingOfLoadAction: statusOfLoadAction === OperationStatus.Pending
  };
}
