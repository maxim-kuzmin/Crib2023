import { useCallback } from 'react';
import {
  type TopicTreeStoreLoadActionInput,
  type TopicTreeStoreLoadActionOutput,
  type TopicTreeStoreLoadCompletedActionPayload,
} from '../../../../../../app';
import { StoreDispatchType, OperationStatus } from '../../../../../../common';
import { useStoreState } from '../../TopicTreeStoreStateHook';
import { useStoreLoadActionDispatch } from './TopicTreeStoreLoadActionDispatchHook';

export function useStoreLoadActionOutput (
  sliceName: string,
  input: TopicTreeStoreLoadActionInput
): TopicTreeStoreLoadActionOutput {
  const { isCanceled, onActionCompleted, payloadOfLoadAction } = input;

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
