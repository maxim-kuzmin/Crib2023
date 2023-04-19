import { useCallback, useMemo } from 'react';
import {
  type ArticleListStoreClearActionDispatch,
  type ArticleListStoreClearActionOptions,
  type ArticleListStoreHooks,
  type ArticleListStoreLoadActionDispatch,
  type ArticleListStoreLoadActionInput,
  type ArticleListStoreLoadActionOptions,
  type ArticleListStoreLoadActionOutput,
  type ArticleListStoreSetActionDispatch,
  type ArticleListStoreSetActionOptions,
  type ArticleListStoreSetActionPayload,
  ArticleListStoreSliceName,
  type ArticleListStoreState
} from '../../../app/Stores';
import { OperationStatus, StoreDispatchType } from '../../../common';
import { type ArticleDomainListGetOperationInput } from '../../../domains';
import { type ArticleTableViewHooks } from './ArticleTableViewHooks';

type ClearActionDispatch = ArticleListStoreClearActionDispatch;
type ClearActionOptions = ArticleListStoreClearActionOptions;

type LoadActionDispatch = ArticleListStoreLoadActionDispatch;
type LoadActionInput = ArticleListStoreLoadActionInput;
type LoadActionOptions = ArticleListStoreLoadActionOptions;
type LoadActionOutput = ArticleListStoreLoadActionOutput;

type SetActionDispatch = ArticleListStoreSetActionDispatch;
type SetActionOptions = ArticleListStoreSetActionOptions;

type StoreState = ArticleListStoreState;

export function createArticleTableViewHooks (
  hooks: ArticleListStoreHooks
): ArticleTableViewHooks {
  const sliceName = ArticleListStoreSliceName.ArticleTableView;

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

  function useLoadActionOutput (input: LoadActionInput): LoadActionOutput {
    const { topicId, pageNumber, pageSize, isCanceled, onActionCompleted } = input;

    const callback = useCallback((payload: ArticleListStoreSetActionPayload) => {
        console.log('MAKC:createArticleTableViewHooks:useLoadActionOutput:callback:payload', payload);

        if (onActionCompleted) {
          onActionCompleted(payload);
        }
      },
      [onActionCompleted]
    );

    const payload: ArticleDomainListGetOperationInput = useMemo(
      () => ({
        topicId,
        pageNumber,
        pageSize
      }),
      [pageNumber, pageSize, topicId]
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

    const { payloadOfSetAction, statusOfLoadAction } = useStoreState();

    return {
      loading: statusOfLoadAction === OperationStatus.Pending,
      payload: payloadOfSetAction
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
