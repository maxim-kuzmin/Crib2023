import { useCallback, useMemo } from 'react';
import {
  type ArticleItemStoreClearActionDispatch,
  type ArticleItemStoreClearActionOptions,
  type ArticleItemStoreHooks,
  type ArticleItemStoreLoadActionDispatch,
  type ArticleItemStoreLoadActionInput,
  type ArticleItemStoreLoadActionOptions,
  type ArticleItemStoreLoadActionOutput,
  type ArticleItemStoreSetActionDispatch,
  type ArticleItemStoreSetActionOptions,
  type ArticleItemStoreSetActionPayload,
  ArticleItemStoreSliceName,
  type ArticleItemStoreState
} from '../../../app/Stores';
import { OperationStatus, StoreDispatchType } from '../../../common';
import { type ArticleDomainItemGetOperationInput } from '../../../domains';
import { type ArticleItemViewHooks } from './ArticleItemViewHooks';

type ClearActionDispatch = ArticleItemStoreClearActionDispatch;
type ClearActionOptions = ArticleItemStoreClearActionOptions;

type LoadActionDispatch = ArticleItemStoreLoadActionDispatch;
type LoadActionInput = ArticleItemStoreLoadActionInput;
type LoadActionOptions = ArticleItemStoreLoadActionOptions;
type LoadActionOutput = ArticleItemStoreLoadActionOutput;

type SetActionDispatch = ArticleItemStoreSetActionDispatch;
type SetActionOptions = ArticleItemStoreSetActionOptions;

type StoreState = ArticleItemStoreState;

export function createArticleItemViewHooks (
  hooks: ArticleItemStoreHooks
): ArticleItemViewHooks {
  const sliceName = ArticleItemStoreSliceName.ArticleItemView;

  function useClearActionDispatch (options: ClearActionOptions): ClearActionDispatch {
    return hooks.useClearActionDispatch(sliceName, options);
  }

  function useLoadActionDispatch (options: LoadActionOptions): LoadActionDispatch {
    return hooks.useLoadActionDispatch(sliceName, options);
  }

  function useSetActionDispatch (options: SetActionOptions): SetActionDispatch {
    return hooks.useSetActionDispatch(sliceName, options);
  }

  function useStoreState (): StoreState {
    return hooks.useStoreState(sliceName);
  }

  function useLoadActionOutput (options: LoadActionInput): LoadActionOutput {
    const { articleId, isCanceled, onActionCompleted } = options;

    const { payloadFromSetAction, status } = useStoreState();

    const callback = useCallback((payload: ArticleItemStoreSetActionPayload) => {
        console.log('MAKC:createArticleItemViewHooks:useLoadActionOutput:callback:payload', payload);

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

    useLoadActionDispatch({
      dispatchType: StoreDispatchType.MountOrUpdate,
      callback,
      isCanceled,
      payload
    });

    useClearActionDispatch({
      dispatchType: StoreDispatchType.Unmount
    });

    return {
      loading: status === OperationStatus.Pending,
      payload: payloadFromSetAction
    };
  }

  return {
    useClearActionDispatch,
    useLoadActionDispatch,
    useLoadActionOutput,
    useSetActionDispatch,
    useStoreState
  };
}
