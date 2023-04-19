import { useCallback, useMemo } from 'react';
import {
  type ArticleItemStoreClearActionDispatch,
  type ArticleItemStoreClearActionOptions,
  type ArticleItemStoreDeleteActionDispatch,
  // //makc//type ArticleItemStoreDeleteActionInput,
  type ArticleItemStoreDeleteActionOptions,
  // //makc//type ArticleItemStoreDeleteActionOutput,
  type ArticleItemStoreDeleteCompletedActionDispatch,
  type ArticleItemStoreDeleteCompletedActionOptions,
  type ArticleItemStoreLoadActionDispatch,
  type ArticleItemStoreLoadActionInput,
  type ArticleItemStoreLoadActionOptions,
  type ArticleItemStoreLoadActionOutput,
  type ArticleItemStoreSaveActionDispatch,
  // //makc//type ArticleItemStoreSaveActionInput,
  type ArticleItemStoreSaveActionOptions,
  // //makc//type ArticleItemStoreSaveActionOutput,
  type ArticleItemStoreSetActionDispatch,
  type ArticleItemStoreSetActionOptions,
  type ArticleItemStoreState,
  type ArticleItemStoreHooks,
  ArticleItemStoreSliceName,
  type ArticleItemStoreSetActionPayload,
  // //makc//type ArticleItemStoreDeleteCompletedActionPayload,
} from '../../../app/Stores';
import { OperationStatus, StoreDispatchType } from '../../../common';
import { type ArticleDomainItemGetOperationInput } from '../../../domains';
import { type ArticleItemViewHooks } from './ArticleItemViewHooks';

type ClearActionDispatch = ArticleItemStoreClearActionDispatch;
type ClearActionOptions = ArticleItemStoreClearActionOptions;

type DeleteActionDispatch = ArticleItemStoreDeleteActionDispatch;
// //makc//type DeleteActionInput = ArticleItemStoreDeleteActionInput;
type DeleteActionOptions = ArticleItemStoreDeleteActionOptions;
// //makc//type DeleteActionOutput = ArticleItemStoreDeleteActionOutput;

type DeleteCompletedActionDispatch = ArticleItemStoreDeleteCompletedActionDispatch;
type DeleteCompletedActionOptions = ArticleItemStoreDeleteCompletedActionOptions;

type LoadActionDispatch = ArticleItemStoreLoadActionDispatch;
type LoadActionInput = ArticleItemStoreLoadActionInput;
type LoadActionOptions = ArticleItemStoreLoadActionOptions;
type LoadActionOutput = ArticleItemStoreLoadActionOutput;

type SaveActionDispatch = ArticleItemStoreSaveActionDispatch;
// //makc//type SaveActionInput = ArticleItemStoreSaveActionInput;
type SaveActionOptions = ArticleItemStoreSaveActionOptions;
// //makc//type SaveActionOutput = ArticleItemStoreSaveActionOutput;

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

  function useDeleteActionDispatch (options: DeleteActionOptions): DeleteActionDispatch {
    return hooks.useDeleteActionDispatch(sliceName, options);
  }

  function useDeleteCompletedActionDispatch (options: DeleteCompletedActionOptions): DeleteCompletedActionDispatch {
    return hooks.useDeleteCompletedActionDispatch(sliceName, options);
  }

  function useLoadActionDispatch (options: LoadActionOptions): LoadActionDispatch {
    return hooks.useLoadActionDispatch(sliceName, options);
  }

  function useSaveActionDispatch (options: SaveActionOptions): SaveActionDispatch {
    return hooks.useSaveActionDispatch(sliceName, options);
  }

  function useSetActionDispatch (options: SetActionOptions): SetActionDispatch {
    return hooks.useSetActionDispatch(sliceName, options);
  }

  function useStoreState (): StoreState {
    return hooks.useStoreState(sliceName);
  }

  function useLoadActionOutput (input: LoadActionInput): LoadActionOutput {
    const { articleId, isCanceled, onActionCompleted } = input;

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

    const { payloadOfSetAction, statusOfLoadAction } = useStoreState();

    return {
      loading: statusOfLoadAction === OperationStatus.Pending,
      payload: payloadOfSetAction
    };
  }

  return {
    useClearActionDispatch,
    useDeleteActionDispatch,
    useDeleteCompletedActionDispatch,
    useLoadActionDispatch,
    useLoadActionOutput,
    useSaveActionDispatch,
    useSetActionDispatch,
    useStoreState
  };
}
