import { useCallback } from 'react';
import {
  type ArticleItemStoreLoadActionInput,
  type ArticleItemStoreLoadActionOutput,
  type ArticleItemStoreLoadCompletedActionPayload,
} from '../../../../../../app/Stores';
import { StoreDispatchType, OperationStatus } from '../../../../../../common';
import { useStoreState } from '../../ArticleItemStoreStateHook';
import { useStoreLoadActionDispatch } from './ArticleItemStoreLoadActionDispatchHook';

export function useStoreLoadActionOutput (
  sliceName: string,
  input: ArticleItemStoreLoadActionInput
): ArticleItemStoreLoadActionOutput {
  const { isCanceled, onActionCompleted, payloadOfLoadAction } = input;

  const callback = useCallback(
    (payload: ArticleItemStoreLoadCompletedActionPayload) => {
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
