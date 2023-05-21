import { useCallback } from 'react';
import { StoreDispatchType, OperationStatus } from '../../../../../../common';
import {
  type ArticleListStoreSliceName,
  type ArticleListStoreLoadActionInput,
  type ArticleListStoreLoadActionOutput,
  type ArticleListStoreLoadCompletedActionPayload,
} from '../../../../../../features';
import { useStoreState } from '../../ArticleListStoreStateHook';
import { useStoreLoadActionDispatch } from './ArticleListStoreLoadActionDispatchHook';

export function useStoreLoadActionOutput (
  sliceName: ArticleListStoreSliceName,
  input: ArticleListStoreLoadActionInput
): ArticleListStoreLoadActionOutput {
  const { abortController, onActionCompleted, payloadOfLoadAction } = input;

  const callback = useCallback(
    (payload: ArticleListStoreLoadCompletedActionPayload) => {
      if (onActionCompleted) {
        onActionCompleted(payload);
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
      payloadOfLoadAction
    }
  );

  const { payloadOfLoadCompletedAction, statusOfLoadAction } = useStoreState(sliceName);

  return {
    dispatchOfLoadAction,
    payloadOfLoadCompletedAction,
    pendingOfLoadAction: statusOfLoadAction === OperationStatus.Pending
  };
}
