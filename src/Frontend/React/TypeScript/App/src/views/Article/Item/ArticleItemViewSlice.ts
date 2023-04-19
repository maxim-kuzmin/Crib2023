import { useCallback, useMemo } from 'react';
import {
  type ArticleItemStoreClearActionDispatch,
  type ArticleItemStoreClearActionInput,
  type ArticleItemStoreClearActionOptions,
  type ArticleItemStoreClearActionOutput,
  type ArticleItemStoreDeleteActionDispatch,
  type ArticleItemStoreDeleteActionInput,
  type ArticleItemStoreDeleteActionOptions,
  type ArticleItemStoreDeleteActionOutput,
  type ArticleItemStoreDeleteCompletedActionPayload,
  type ArticleItemStoreLoadActionDispatch,
  type ArticleItemStoreLoadActionInput,
  type ArticleItemStoreLoadActionOptions,
  type ArticleItemStoreLoadActionOutput,
  type ArticleItemStoreLoadCompletedActionPayload,
  type ArticleItemStoreSaveActionDispatch,
  type ArticleItemStoreSaveActionInput,
  type ArticleItemStoreSaveActionOptions,
  type ArticleItemStoreSaveActionOutput,
  type ArticleItemStoreSaveCompletedActionPayload,
  type ArticleItemStoreSetActionDispatch,
  type ArticleItemStoreSetActionInput,
  type ArticleItemStoreSetActionOptions,
  type ArticleItemStoreSetActionOutput,
  type ArticleItemStoreSetActionPayload,
  type ArticleItemStoreState,
  type ArticleItemStoreHooks,
  ArticleItemStoreSliceName,
} from '../../../app/Stores';
import { OperationStatus, StoreDispatchType } from '../../../common';
import { type ArticleDomainItemGetOperationInput } from '../../../domains';
import { type ArticleItemViewHooks } from './ArticleItemViewHooks';

type ClearActionDispatch = ArticleItemStoreClearActionDispatch;
type ClearActionInput = ArticleItemStoreClearActionInput;
type ClearActionOptions = ArticleItemStoreClearActionOptions;
type ClearActionOutput = ArticleItemStoreClearActionOutput;

type DeleteActionDispatch = ArticleItemStoreDeleteActionDispatch;
type DeleteActionInput = ArticleItemStoreDeleteActionInput;
type DeleteActionOptions = ArticleItemStoreDeleteActionOptions;
type DeleteActionOutput = ArticleItemStoreDeleteActionOutput;

type DeleteCompletedActionPayload = ArticleItemStoreDeleteCompletedActionPayload;

type LoadActionDispatch = ArticleItemStoreLoadActionDispatch;
type LoadActionInput = ArticleItemStoreLoadActionInput;
type LoadActionOptions = ArticleItemStoreLoadActionOptions;
type LoadActionOutput = ArticleItemStoreLoadActionOutput;

type LoadCompletedActionPayload = ArticleItemStoreLoadCompletedActionPayload;

type SaveActionDispatch = ArticleItemStoreSaveActionDispatch;
type SaveActionInput = ArticleItemStoreSaveActionInput;
type SaveActionOptions = ArticleItemStoreSaveActionOptions;
type SaveActionOutput = ArticleItemStoreSaveActionOutput;

type SaveCompletedActionPayload = ArticleItemStoreSaveCompletedActionPayload;

type SetActionDispatch = ArticleItemStoreSetActionDispatch;
type SetActionInput = ArticleItemStoreSetActionInput;
type SetActionOptions = ArticleItemStoreSetActionOptions;
type SetActionOutput = ArticleItemStoreSetActionOutput;
type SetActionPayload = ArticleItemStoreSetActionPayload;

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

  function useClearActionOutput (input: ClearActionInput): ClearActionOutput {
    const { onActionCompleted } = input;

    const callback = useCallback(() => {
        console.log('MAKC:createArticleItemViewHooks:useClearActionOutput:callback');

        if (onActionCompleted) {
          onActionCompleted();
        }
      },
      [onActionCompleted]
    );

    const dispatchOfClearAction = useClearActionDispatch({
      callback,
      dispatchType: StoreDispatchType.Unmount
    });

    return { dispatchOfClearAction };
  }

  function useDeleteActionOutput (input: DeleteActionInput): DeleteActionOutput {
    const { onActionCompleted } = input;

    const callback = useCallback((payload: DeleteCompletedActionPayload) => {
        console.log('MAKC:createArticleItemViewHooks:useDeleteActionOutput:callback:payload', payload);

        if (onActionCompleted) {
          onActionCompleted(payload);
        }
      },
      [onActionCompleted]
    );

    const dispatchOfDeleteAction = useDeleteActionDispatch({ callback });

    const { payloadOfDeleteCompletedAction, statusOfDeleteAction } = useStoreState();

    return {
      dispatchOfDeleteAction,
      payloadOfDeleteCompletedAction,
      pendingOfDeleteAction: statusOfDeleteAction === OperationStatus.Pending
    };
  }

  function useLoadActionOutput (input: LoadActionInput): LoadActionOutput {
    const { articleId, isCanceled, onActionCompleted } = input;

    const callback = useCallback((payload: LoadCompletedActionPayload) => {
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

    const dispatchOfLoadAction = useLoadActionDispatch({
      dispatchType: StoreDispatchType.MountOrUpdate,
      callback,
      isCanceled,
      payload
    });

    const { payloadOfLoadCompletedAction, statusOfLoadAction } = useStoreState();

    return {
      dispatchOfLoadAction,
      payloadOfLoadCompletedAction,
      pendingOfLoadAction: statusOfLoadAction === OperationStatus.Pending
    };
  }

  function useSaveActionOutput (input: SaveActionInput): SaveActionOutput {
    const { onActionCompleted } = input;

    const callback = useCallback((payload: SaveCompletedActionPayload) => {
        console.log('MAKC:createArticleItemViewHooks:useSaveActionOutput:callback:payload', payload);

        if (onActionCompleted) {
          onActionCompleted(payload);
        }
      },
      [onActionCompleted]
    );

    const dispatchOfSaveAction = useSaveActionDispatch({ callback });

    const { payloadOfSaveCompletedAction, statusOfSaveAction } = useStoreState();

    return {
      dispatchOfSaveAction,
      payloadOfSaveCompletedAction,
      pendingOfSaveAction: statusOfSaveAction === OperationStatus.Pending
    };
  }

  function useSetActionOutput (input: SetActionInput): SetActionOutput {
    const { onActionCompleted } = input;

    const callback = useCallback((payload: SetActionPayload) => {
        console.log('MAKC:createArticleItemViewHooks:useSetActionOutput:callback:payload', payload);

        if (onActionCompleted) {
          onActionCompleted(payload);
        }
      },
      [onActionCompleted]
    );

    const dispatchOfSetAction = useSetActionDispatch({ callback });

    const { payloadOfSetAction } = useStoreState();

    return {
      dispatchOfSetAction,
      payloadOfSetAction
    };
  }

  return {
    useClearActionOutput,
    useDeleteActionOutput,
    useLoadActionOutput,
    useSaveActionOutput,
    useSetActionOutput
  };
}
