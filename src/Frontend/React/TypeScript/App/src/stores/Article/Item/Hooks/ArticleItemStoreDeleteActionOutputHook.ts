import { useCallback } from 'react';
import {
  type ArticleItemStoreDeleteActionInput,
  type ArticleItemStoreDeleteActionOutput,
  type ArticleItemStoreDeleteCompletedActionPayload,
} from '../../../../app/Stores';
import { OperationStatus } from '../../../../common';
import { useDeleteActionDispatch } from './ArticleItemStoreDeleteActionDispatchHook';
import { useStoreState } from './ArticleItemStoreStateHook';

// ---Store---> //

type DeleteActionInput = ArticleItemStoreDeleteActionInput;
type DeleteActionOutput = ArticleItemStoreDeleteActionOutput;

type DeleteCompletedActionPayload = ArticleItemStoreDeleteCompletedActionPayload;

// <---Store--- //

export function useDeleteActionOutput (sliceName: string, input: DeleteActionInput): DeleteActionOutput {
  const { onActionCompleted } = input;

  const callback = useCallback((payload: DeleteCompletedActionPayload) => {
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
