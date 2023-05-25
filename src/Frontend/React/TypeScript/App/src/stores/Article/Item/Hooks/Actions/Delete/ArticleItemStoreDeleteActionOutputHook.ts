import { useCallback } from 'react';
import { OperationStatus } from '../../../../../../common';
import {
  type ArticleItemStoreSliceName,
  type ArticleItemStoreDeleteActionInput,
  type ArticleItemStoreDeleteActionOutput,
  type ArticleItemStoreDeleteCompletedActionResult,
} from '../../../../../../features';
import { useStoreState } from '../../ArticleItemStoreStateHook';
import { useStoreDeleteActionDispatch } from './ArticleItemStoreDeleteActionDispatchHook';

export function useStoreDeleteActionOutput (
  sliceName: ArticleItemStoreSliceName,
  input: ArticleItemStoreDeleteActionInput = {}
): ArticleItemStoreDeleteActionOutput {
  const { onActionCompleted } = input;

  const callback = useCallback(
    (data: ArticleItemStoreDeleteCompletedActionResult) => {
      if (onActionCompleted) {
        onActionCompleted(data);
      }
    },
    [onActionCompleted]
  );

  const dispatchOfDeleteAction = useStoreDeleteActionDispatch(sliceName, { callback });

  const { resultOfDeleteCompletedAction, statusOfDeleteAction } = useStoreState(sliceName);

  return {
    dispatchOfDeleteAction,
    pendingOfDeleteAction: statusOfDeleteAction === OperationStatus.Pending,
    resultOfDeleteCompletedAction,
  };
}
