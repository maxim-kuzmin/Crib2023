import { useCallback } from 'react';
import { OperationStatus } from '../../../../../../common';
import {
  type ArticleItemStoreSlice,
  type ArticleItemStoreSaveActionInput,
  type ArticleItemStoreSaveActionOutput,
  type ArticleItemStoreSaveCompletedActionPayload,
} from '../../../../../../features';
import { useStoreSaveActionDispatch } from './ArticleItemStoreSaveActionDispatchHook';
import { useStoreState } from '../../ArticleItemStoreStateHook';

export function useStoreSaveActionOutput (
  slice: ArticleItemStoreSlice,
  input: ArticleItemStoreSaveActionInput = {}
): ArticleItemStoreSaveActionOutput {
  const { onActionCompleted } = input;

  const callback = useCallback(
    (payload: ArticleItemStoreSaveCompletedActionPayload) => {
      if (onActionCompleted) {
        onActionCompleted(payload);
      }
    },
    [onActionCompleted]
  );

  const dispatchOfSaveAction = useStoreSaveActionDispatch(slice, { callback });

  const { payloadOfSaveCompletedAction, statusOfSaveAction } = useStoreState(slice);

  return {
    dispatchOfSaveAction,
    payloadOfSaveCompletedAction,
    pendingOfSaveAction: statusOfSaveAction === OperationStatus.Pending
  };
}
