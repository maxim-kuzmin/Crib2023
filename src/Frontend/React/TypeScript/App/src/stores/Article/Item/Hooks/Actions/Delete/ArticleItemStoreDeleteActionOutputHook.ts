import { useCallback } from 'react';
import {
  type ArticleItemStoreDeleteActionInput,
  type ArticleItemStoreDeleteActionOutput,
  type ArticleItemStoreDeleteCompletedActionPayload,
} from '../../../../../../app/Stores';
import { OperationStatus } from '../../../../../../common';
import { useStoreState } from '../../ArticleItemStoreStateHook';
import { useDeleteActionDispatch } from './ArticleItemStoreDeleteActionDispatchHook';

export function useDeleteActionOutput (
  sliceName: string,
  input: ArticleItemStoreDeleteActionInput
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

  const dispatchOfDeleteAction = useDeleteActionDispatch(sliceName, { callback });

  const { payloadOfDeleteCompletedAction, statusOfDeleteAction } = useStoreState(sliceName);

  return {
    dispatchOfDeleteAction,
    payloadOfDeleteCompletedAction,
    pendingOfDeleteAction: statusOfDeleteAction === OperationStatus.Pending
  };
}
