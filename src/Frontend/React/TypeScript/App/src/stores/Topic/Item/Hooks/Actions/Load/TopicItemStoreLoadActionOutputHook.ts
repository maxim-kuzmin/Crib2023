import { useCallback } from 'react';
import { StoreDispatchType, OperationStatus } from '../../../../../../common';
import {
  type TopicItemStoreSliceName,
  type TopicItemStoreLoadActionInput,
  type TopicItemStoreLoadActionOutput,
  type TopicItemStoreLoadCompletedActionResult,
} from '../../../../../../features';
import { useStoreState } from '../../TopicItemStoreStateHook';
import { useStoreLoadActionDispatch } from './TopicItemStoreLoadActionDispatchHook';

export function useStoreLoadActionOutput (
  sliceName: TopicItemStoreSliceName,
  input: TopicItemStoreLoadActionInput
): TopicItemStoreLoadActionOutput {
  const { abortController, onActionCompleted, resultOfLoadAction } = input;

  const callback = useCallback(
    (data: TopicItemStoreLoadCompletedActionResult) => {
      if (onActionCompleted) {
        onActionCompleted(data);
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
      resultOfLoadAction
    }
  );

  const { resultOfLoadCompletedAction, statusOfLoadAction } = useStoreState(sliceName);

  return {
    dispatchOfLoadAction,
    pendingOfLoadAction: statusOfLoadAction === OperationStatus.Pending,
    resultOfLoadCompletedAction,
  };
}
