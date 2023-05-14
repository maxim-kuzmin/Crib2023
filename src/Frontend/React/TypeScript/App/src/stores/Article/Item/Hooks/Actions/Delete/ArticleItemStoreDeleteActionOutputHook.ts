import { useCallback } from 'react';
import { OperationStatus } from '../../../../../../common';
import {
  type ArticleItemStoreSlice,
  type ArticleItemStoreDeleteActionInput,
  type ArticleItemStoreDeleteActionOutput,
  type ArticleItemStoreDeleteCompletedActionPayload,
} from '../../../../../../features';
import { useStoreState } from '../../ArticleItemStoreStateHook';
import { useStoreDeleteActionDispatch } from './ArticleItemStoreDeleteActionDispatchHook';

export function useStoreDeleteActionOutput (
  slice: ArticleItemStoreSlice,
  input: ArticleItemStoreDeleteActionInput = {}
): ArticleItemStoreDeleteActionOutput {
  const { onActionCompleted } = input;

  const callback = useCallback(
    (payload: ArticleItemStoreDeleteCompletedActionPayload) => {
      if (onActionCompleted) {
        onActionCompleted(payload);
      }
    },
    [onActionCompleted]
  );

  const dispatchOfDeleteAction = useStoreDeleteActionDispatch(slice, { callback });

  const { payloadOfDeleteCompletedAction, statusOfDeleteAction } = useStoreState(slice);

  return {
    dispatchOfDeleteAction,
    payloadOfDeleteCompletedAction,
    pendingOfDeleteAction: statusOfDeleteAction === OperationStatus.Pending
  };
}
