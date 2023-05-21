import { useCallback } from 'react';
import { StoreDispatchType, OperationStatus } from '../../../../../../common';
import {
  type ArticleItemStoreSliceName,
  type ArticleItemStoreLoadActionInput,
  type ArticleItemStoreLoadActionOutput,
  type ArticleItemStoreLoadCompletedActionPayload,
} from '../../../../../../features';
import { useStoreState } from '../../ArticleItemStoreStateHook';
import { useStoreLoadActionDispatch } from './ArticleItemStoreLoadActionDispatchHook';

export function useStoreLoadActionOutput (
  sliceName: ArticleItemStoreSliceName,
  input: ArticleItemStoreLoadActionInput
): ArticleItemStoreLoadActionOutput {
  const { abortController, onActionCompleted, payloadOfLoadAction } = input;

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
