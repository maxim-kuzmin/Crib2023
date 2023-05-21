import { useCallback } from 'react';
import { StoreDispatchType, OperationStatus } from '../../../../../../common';
import {
  type TopicTreeStoreSliceName,
  type TopicTreeStoreLoadActionInput,
  type TopicTreeStoreLoadActionOutput,
  type TopicTreeStoreLoadCompletedActionPayload,
} from '../../../../../../features';
import { useStoreState } from '../../TopicTreeStoreStateHook';
import { useStoreLoadActionDispatch } from './TopicTreeStoreLoadActionDispatchHook';

export function useStoreLoadActionOutput (
  sliceName: TopicTreeStoreSliceName,
  input: TopicTreeStoreLoadActionInput
): TopicTreeStoreLoadActionOutput {
  const { abortController, onActionCompleted, payloadOfLoadAction } = input;

  const callback = useCallback(
    (payload: TopicTreeStoreLoadCompletedActionPayload) => {
      if (onActionCompleted) {
        onActionCompleted(payload);
      }
    },
    [onActionCompleted]
  );

  const dispatchOfLoadAction = useStoreLoadActionDispatch(
    sliceName,
    {
      abortController,
      callback,
      dispatchType: StoreDispatchType.MountOrUpdate,
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
