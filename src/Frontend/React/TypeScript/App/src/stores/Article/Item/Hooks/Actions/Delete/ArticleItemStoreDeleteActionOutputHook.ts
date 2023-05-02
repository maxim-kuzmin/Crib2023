import { useCallback } from 'react';
import { OperationStatus } from '../../../../../../common';
import {
  type ArticleItemStoreDeleteActionInput,
  type ArticleItemStoreDeleteActionOutput,
  type ArticleItemStoreDeleteCompletedActionPayload,
} from '../../../../../../features';
import { useStoreState } from '../../ArticleItemStoreStateHook';
import { useStoreDeleteActionDispatch } from './ArticleItemStoreDeleteActionDispatchHook';

export function useStoreDeleteActionOutput (
  sliceName: string,
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

  const dispatchOfDeleteAction = useStoreDeleteActionDispatch(sliceName, { callback });

  const { payloadOfDeleteCompletedAction, statusOfDeleteAction } = useStoreState(sliceName);

  return {
    dispatchOfDeleteAction,
    payloadOfDeleteCompletedAction,
    pendingOfDeleteAction: statusOfDeleteAction === OperationStatus.Pending
  };
}
