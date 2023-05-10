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
  owner: string,
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

  const dispatchOfDeleteAction = useStoreDeleteActionDispatch(owner, { callback });

  const { payloadOfDeleteCompletedAction, statusOfDeleteAction } = useStoreState(owner);

  return {
    dispatchOfDeleteAction,
    payloadOfDeleteCompletedAction,
    pendingOfDeleteAction: statusOfDeleteAction === OperationStatus.Pending
  };
}
