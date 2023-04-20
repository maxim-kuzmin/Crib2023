import { useCallback } from 'react';
import {
  type ArticleItemStoreSaveActionInput,
  type ArticleItemStoreSaveActionOutput,
  type ArticleItemStoreSaveCompletedActionPayload,
} from '../../../../../../app/Stores';
import { OperationStatus } from '../../../../../../common';
import { useSaveActionDispatch } from './ArticleItemStoreSaveActionDispatchHook';
import { useStoreState } from '../../ArticleItemStoreStateHook';

export function useSaveActionOutput (
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

  const dispatchOfSaveAction = useSaveActionDispatch(sliceName, { callback });

  const { payloadOfSaveCompletedAction, statusOfSaveAction } = useStoreState(sliceName);

  return {
    dispatchOfSaveAction,
    payloadOfSaveCompletedAction,
    pendingOfSaveAction: statusOfSaveAction === OperationStatus.Pending
  };
}
