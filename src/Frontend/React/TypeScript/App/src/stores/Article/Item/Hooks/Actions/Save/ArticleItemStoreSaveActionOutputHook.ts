import { useCallback } from 'react';
import { OperationStatus } from '../../../../../../common';
import {
  type ArticleItemStoreSaveActionInput,
  type ArticleItemStoreSaveActionOutput,
  type ArticleItemStoreSaveCompletedActionPayload,
} from '../../../../../../features';
import { useStoreSaveActionDispatch } from './ArticleItemStoreSaveActionDispatchHook';
import { useStoreState } from '../../ArticleItemStoreStateHook';

export function useStoreSaveActionOutput (
  sliceName: string,
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

  const dispatchOfSaveAction = useStoreSaveActionDispatch(sliceName, { callback });

  const { payloadOfSaveCompletedAction, statusOfSaveAction } = useStoreState(sliceName);

  return {
    dispatchOfSaveAction,
    payloadOfSaveCompletedAction,
    pendingOfSaveAction: statusOfSaveAction === OperationStatus.Pending
  };
}
