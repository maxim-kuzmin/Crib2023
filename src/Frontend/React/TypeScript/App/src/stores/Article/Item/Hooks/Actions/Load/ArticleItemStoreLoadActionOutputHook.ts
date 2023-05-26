import { useCallback } from 'react';
import { StoreDispatchType, OperationStatus } from '../../../../../../common';
import {
  type ArticleItemStoreLoadActionInput,
  type ArticleItemStoreLoadActionOutput,
  type ArticleItemStoreLoadCompletedActionResult,
  type ArticleItemStoreSliceName,
} from '../../../../../../features';
import { useStoreState } from '../../ArticleItemStoreStateHook';
import { useStoreLoadActionDispatch } from './ArticleItemStoreLoadActionDispatchHook';

export function useStoreLoadActionOutput (
  sliceName: ArticleItemStoreSliceName,
  input: ArticleItemStoreLoadActionInput
): ArticleItemStoreLoadActionOutput {
  const { abortController, onActionCompleted, resultOfLoadAction } = input;

  const callback = useCallback(
    (data: ArticleItemStoreLoadCompletedActionResult) => {
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
