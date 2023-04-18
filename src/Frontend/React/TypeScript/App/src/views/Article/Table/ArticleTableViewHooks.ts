import { useCallback, useMemo } from 'react';
import { getModule } from '../../../app/ModuleImpl';
import {
  type ArticleListStoreSetActionPayload,
  type ArticleListStoreClearActionDispatch,
  type ArticleListStoreClearActionOptions,
  type ArticleListStoreLoadActionDispatch,
  type ArticleListStoreLoadActionOptions,
  type ArticleListStoreSetActionDispatch,
  type ArticleListStoreSetActionOptions,
  type ArticleListStoreState
} from '../../../app/Stores';
import { OperationStatus, StoreDispatchType } from '../../../common';
import { type ArticleDomainListGetOperationInput } from '../../../domains';

type ClearActionDispatch = ArticleListStoreClearActionDispatch;
type ClearActionOptions = ArticleListStoreClearActionOptions;

type LoadActionDispatch = ArticleListStoreLoadActionDispatch;
type LoadActionOptions = ArticleListStoreLoadActionOptions;

type SetActionDispatch = ArticleListStoreSetActionDispatch;
type SetActionOptions = ArticleListStoreSetActionOptions;

type State = ArticleListStoreState;

export interface ArticleTableViewHooks {
  readonly useDispatchToClear: (options: ClearActionOptions) => ClearActionDispatch;
  readonly useDispatchToLoad: (options: LoadActionOptions) => LoadActionDispatch;
  readonly useDispatchToSet: (options: SetActionOptions) => SetActionDispatch;
  readonly useState: () => State;
}

interface LoadOptions {
  topicId: number;
  pageNumber: number;
  pageSize: number;
  isCanceled?: boolean;
  onArticlesLoaded?: (payload: ArticleListStoreSetActionPayload) => void;
}

interface LoadResult {
  loading: boolean;
  payload: ArticleListStoreSetActionPayload;
}

export function useArticleTableViewLoad (options: LoadOptions): LoadResult {
  const { topicId, pageNumber, pageSize, isCanceled, onArticlesLoaded } = options;

  const hooks = getModule().getArticleTableViewHooks();

  const { payloadFromSetAction, status } = hooks.useState();

  const callback = useCallback((payload: ArticleListStoreSetActionPayload) => {
    console.log('MAKC:useArticleTableViewLoad:callback:payload', payload);

    if (onArticlesLoaded) {
      onArticlesLoaded(payload);
    }
  }, [onArticlesLoaded]);

  const payload: ArticleDomainListGetOperationInput = useMemo(
    () => ({
      topicId,
      pageNumber,
      pageSize
    }),
    [pageNumber, pageSize, topicId]
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
