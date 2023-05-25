import { useCallback } from 'react';
import { StoreDispatchType, OperationStatus } from '../../../../../../common';
import {
  type ArticleListStoreSliceName,
  type ArticleListStoreLoadActionInput,
  type ArticleListStoreLoadActionOutput,
  type ArticleListStoreLoadCompletedActionResult,
} from '../../../../../../features';
import { useStoreState } from '../../ArticleListStoreStateHook';
import { useStoreLoadActionDispatch } from './ArticleListStoreLoadActionDispatchHook';

export function useStoreLoadActionOutput (
  sliceName: ArticleListStoreSliceName,
  input: ArticleListStoreLoadActionInput
): ArticleListStoreLoadActionOutput {
  const { abortController, onActionCompleted, resultOfLoadAction } = input;

  const callback = useCallback(
    (data: ArticleListStoreLoadCompletedActionResult) => {
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
