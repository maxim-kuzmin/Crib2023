import { type Dispatch, useEffect, useRef } from 'react';
import { getModule } from '../../../../app/ModuleImpl';
import {
  type ArticleItemStoreSaveActionDispatch,
  type ArticleItemStoreSaveActionOptions,
  type ArticleItemStoreSaveActionPayload,
  type ArticleItemStoreSetActionCallback,
} from '../../../../app/Stores';
import { type ShouldBeCanceled, StoreDispatchType } from '../../../../common';
import { type ArticleTypeEntity } from '../../../../data';
import {
  type ArticleDomainItemSaveOperationRequestHandler,
  createArticleDomainItemSaveOperationRequest
} from '../../../../domains';
import { type ArticleItemStoreSaveAction } from '../Actions';
import { ArticleItemStoreActionType } from '../ArticleItemStoreActionType';
import { useArticleItemStoreDispatchContext } from '../ArticleItemStoreContext';
import { type ArticleItemStoreActionUnion } from '../ArticleItemStoreActionUnion';

import { runSaveCompletedAction } from './ArticleItemStoreSaveCompletedActionDispatchHook';

// ---Store---> //

type ActionUnion = ArticleItemStoreActionUnion;

type SaveAction = ArticleItemStoreSaveAction;
type SaveActionDispatch = ArticleItemStoreSaveActionDispatch;
type SaveActionOptions = ArticleItemStoreSaveActionOptions;
type SaveActionPayload = ArticleItemStoreSaveActionPayload;

type SaveOperationRequestHandler = ArticleDomainItemSaveOperationRequestHandler;

type SetActionCallback = ArticleItemStoreSetActionCallback;

function createSaveAction (sliceName: string, payload: SaveActionPayload): SaveAction {
  return {
    type: ArticleItemStoreActionType.Save,
    payload,
    sliceName
  };
};

function createSaveOperationRequest (
  input: ArticleTypeEntity,
  operationCode?: string
) {
  return createArticleDomainItemSaveOperationRequest(input, operationCode);
}

function useDispatchContext (): Dispatch<ActionUnion> {
  return useArticleItemStoreDispatchContext();
}

function useSaveOperationRequestHandler (): SaveOperationRequestHandler {
  return getModule().useArticleDomainItemSaveOperationRequestHandler();
}

// <---Store--- //

interface RunSaveActionOptions {
  readonly callback?: SetActionCallback;
  readonly dispatch: Dispatch<ActionUnion>;
  readonly payload: SaveActionPayload;
  readonly requestHandler: SaveOperationRequestHandler;
  readonly shouldBeCanceled: ShouldBeCanceled;
  readonly sliceName: string;
}

async function runSaveAction ({
  callback,
  dispatch,
  shouldBeCanceled,
  sliceName,
  payload,
  requestHandler
}: RunSaveActionOptions) {
  if (shouldBeCanceled()) {
    return;
  }

  dispatch(createSaveAction(sliceName, payload));

  const response = payload
    ? await requestHandler.handle(createSaveOperationRequest(payload), shouldBeCanceled)
    : null;

  if (shouldBeCanceled()) {
    return;
  }

  runSaveCompletedAction({ sliceName, dispatch, callback, payload: response });
}

export function useSaveActionDispatch (
  sliceName: string,
  {
    callback,
    dispatchType,
    isCanceled,
    payload
  }: SaveActionOptions
): SaveActionDispatch {
  const dispatch = useDispatchContext();

  const requestHandler = useRef(useSaveOperationRequestHandler()).current;

  useEffect(() => {
    let isCanceledInner = isCanceled ?? false;

    const shouldBeCanceledInner = () => isCanceledInner;

    if (dispatchType === StoreDispatchType.MountOrUpdate && payload) {
      runSaveAction({
        sliceName,
        requestHandler,
        dispatch,
        callback,
        shouldBeCanceled: shouldBeCanceledInner,
        payload
      });
    }

    return () => {
      if (dispatchType === StoreDispatchType.Unmount && payload) {
        runSaveAction({
          sliceName,
          requestHandler,
          dispatch,
          callback,
          shouldBeCanceled: shouldBeCanceledInner,
          payload
        });
      } else {
        isCanceledInner = true;
      }
    };
  }, [sliceName, requestHandler, dispatch, dispatchType, isCanceled, callback, payload]);

  return useRef({
    run: async (payload: SaveActionPayload, shouldBeCanceled: ShouldBeCanceled = () => false) => {
      runSaveAction({
        sliceName,
        requestHandler,
        dispatch,
        callback,
        shouldBeCanceled,
        payload
      });
    }
  }).current;
}
