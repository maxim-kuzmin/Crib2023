import { useCallback } from 'react';
import {
  type TopicTreeStoreLoadActionInput,
  type TopicTreeStoreLoadActionOutput,
  type TopicTreeStoreLoadCompletedActionPayload,
} from '../../../../../../app/Stores';
import { StoreDispatchType, OperationStatus } from '../../../../../../common';
import { useStoreState } from '../../TopicTreeStoreStateHook';
import { useLoadActionDispatch } from './TopicTreeStoreLoadActionDispatchHook';

export function useLoadActionOutput (
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

  const dispatchOfLoadAction = useLoadActionDispatch(
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
