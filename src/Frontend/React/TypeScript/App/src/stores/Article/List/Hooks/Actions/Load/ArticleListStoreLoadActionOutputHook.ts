import { useCallback } from 'react';
import {
  type ArticleListStoreLoadActionInput,
  type ArticleListStoreLoadActionOutput,
  type ArticleListStoreLoadCompletedActionPayload,
} from '../../../../../../app/Stores';
import { StoreDispatchType, OperationStatus } from '../../../../../../common';
import { useStoreState } from '../../ArticleListStoreStateHook';
import { useStoreLoadActionDispatch } from './ArticleListStoreLoadActionDispatchHook';

export function useStoreLoadActionOutput (
  sliceName: string,
  input: ArticleListStoreLoadActionInput
): ArticleListStoreLoadActionOutput {
  const { isCanceled, onActionCompleted, payloadOfLoadAction } = input;

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
      callback,
      dispatchType: StoreDispatchType.MountOrUpdate,
      isCanceled,
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
