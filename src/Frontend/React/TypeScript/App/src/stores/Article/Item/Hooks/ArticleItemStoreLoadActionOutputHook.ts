import { useCallback, useMemo } from 'react';
import {
  type ArticleItemStoreLoadActionInput,
  type ArticleItemStoreLoadActionOutput,
  type ArticleItemStoreLoadCompletedActionPayload,
} from '../../../../app/Stores';
import { StoreDispatchType, OperationStatus } from '../../../../common';
import { type ArticleDomainItemGetOperationInput } from '../../../../domains';
import { useStoreState } from './ArticleItemStoreStateHook';
import { useLoadActionDispatch } from './ArticleItemStoreLoadActionDispatchHook';

// ---Store---> //

type LoadActionInput = ArticleItemStoreLoadActionInput;
type LoadActionOutput = ArticleItemStoreLoadActionOutput;

type LoadCompletedActionPayload = ArticleItemStoreLoadCompletedActionPayload;

// <---Store--- //

export function useLoadActionOutput (sliceName: string, input: LoadActionInput): LoadActionOutput {
  const { articleId, isCanceled, onActionCompleted } = input;

  const callback = useCallback((payload: LoadCompletedActionPayload) => {
      if (onActionCompleted) {
        onActionCompleted(payload);
      }
    },
    [onActionCompleted]
  );

  const payload: ArticleDomainItemGetOperationInput = useMemo(
    () => ({
      id: articleId
    }),
    [articleId]
  );

  const dispatchOfLoadAction = useLoadActionDispatch(
    sliceName,
    {
      dispatchType: StoreDispatchType.MountOrUpdate,
      callback,
      isCanceled,
      payload
    }
  );

  const { payloadOfLoadCompletedAction, statusOfLoadAction } = useStoreState(sliceName);

  return {
    dispatchOfLoadAction,
    payloadOfLoadCompletedAction,
    pendingOfLoadAction: statusOfLoadAction === OperationStatus.Pending
  };
}
