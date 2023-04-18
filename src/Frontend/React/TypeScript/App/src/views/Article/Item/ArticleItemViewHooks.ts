import { useCallback, useMemo } from 'react';
import { getModule } from '../../../app/ModuleImpl';
import {
  type ArticleItemStoreSetActionPayload,
  type ArticleItemStoreClearActionDispatch,
  type ArticleItemStoreClearActionOptions,
  type ArticleItemStoreLoadActionDispatch,
  type ArticleItemStoreLoadActionOptions,
  type ArticleItemStoreSetActionDispatch,
  type ArticleItemStoreSetActionOptions,
  type ArticleItemStoreState
} from '../../../app/Stores';
import { OperationStatus, StoreDispatchType } from '../../../common';
import { type ArticleDomainItemGetOperationInput } from '../../../domains';

type ClearActionDispatch = ArticleItemStoreClearActionDispatch;
type ClearActionOptions = ArticleItemStoreClearActionOptions;

type LoadActionDispatch = ArticleItemStoreLoadActionDispatch;
type LoadActionOptions = ArticleItemStoreLoadActionOptions;

type SetActionDispatch = ArticleItemStoreSetActionDispatch;
type SetActionOptions = ArticleItemStoreSetActionOptions;

type State = ArticleItemStoreState;

export interface ArticleItemViewHooks {
  readonly useDispatchToClear: (options: ClearActionOptions) => ClearActionDispatch;
  readonly useDispatchToLoad: (options: LoadActionOptions) => LoadActionDispatch;
  readonly useDispatchToSet: (options: SetActionOptions) => SetActionDispatch;
  readonly useState: () => State;
}

interface LoadOptions {
  readonly articleId: number;
  readonly isCanceled?: boolean;
  readonly onArticleLoaded?: (payload: ArticleItemStoreSetActionPayload) => void;
}

interface LoadResult {
  readonly loading: boolean;
  readonly payload: ArticleItemStoreSetActionPayload;
}

export function useArticleItemViewLoad (options: LoadOptions): LoadResult {
  const { articleId, isCanceled, onArticleLoaded } = options;

  const hooks = getModule().getArticleItemViewHooks();

  const { payloadFromSetAction, status } = hooks.useState();

  const callback = useCallback((payload: ArticleItemStoreSetActionPayload) => {
    console.log('MAKC:useArticleItemViewLoad:callback:payload', payload);

    if (onArticleLoaded) {
      onArticleLoaded(payload);
    }
  }, [onArticleLoaded]);

  const payload: ArticleDomainItemGetOperationInput = useMemo(
    () => ({
      id: articleId
    }),
    [articleId]
  );

  hooks.useDispatchToLoad({
    dispatchType: StoreDispatchType.MountOrUpdate,
    callback,
    isCanceled,
    payload
  });

  hooks.useDispatchToClear({
    dispatchType: StoreDispatchType.Unmount
  });

  return {
    loading: status === OperationStatus.Pending,
    payload: payloadFromSetAction
  };
}
