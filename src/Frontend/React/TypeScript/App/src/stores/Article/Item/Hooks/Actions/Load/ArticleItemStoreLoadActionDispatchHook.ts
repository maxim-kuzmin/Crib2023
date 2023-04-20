import { type Dispatch, useEffect, useRef } from 'react';
import { getModule } from '../../../../../../app/ModuleImpl';
import {
  type ArticleItemStoreLoadActionDispatch,
  type ArticleItemStoreLoadActionOptions,
  type ArticleItemStoreLoadActionPayload,
  type ArticleItemStoreSetActionCallback,
} from '../../../../../../app/Stores';
import { type ShouldBeCanceled, StoreDispatchType } from '../../../../../../common';
import {
  type ArticleDomainItemGetOperationInput,
  type ArticleDomainItemGetOperationRequestHandler,
  createArticleDomainItemGetOperationRequest
} from '../../../../../../domains';
import { type ArticleItemStoreLoadAction } from '../../../Actions';
import { ArticleItemStoreActionType } from '../../../ArticleItemStoreActionType';
import { useArticleItemStoreDispatchContext } from '../../../ArticleItemStoreContext';
import { type ArticleItemStoreActionUnion } from '../../../ArticleItemStoreActionUnion';
import { runLoadCompletedAction } from '../LoadCompleted/ArticleItemStoreLoadCompletedActionDispatchHook';

// ---Store---> //

type ActionUnion = ArticleItemStoreActionUnion;

type GetOperationRequestHandler = ArticleDomainItemGetOperationRequestHandler;

type LoadAction = ArticleItemStoreLoadAction;
type LoadActionDispatch = ArticleItemStoreLoadActionDispatch;
type LoadActionOptions = ArticleItemStoreLoadActionOptions;
type LoadActionPayload = ArticleItemStoreLoadActionPayload;

type SetActionCallback = ArticleItemStoreSetActionCallback;

function createGetOperationRequest (
  input: ArticleDomainItemGetOperationInput,
  operationCode?: string
) {
  return createArticleDomainItemGetOperationRequest(input, operationCode);
}

function createLoadAction (sliceName: string, payload: LoadActionPayload): LoadAction {
  return {
    type: ArticleItemStoreActionType.Load,
    payload,
    sliceName
  };
};

function useDispatchContext (): Dispatch<ActionUnion> {
  return useArticleItemStoreDispatchContext();
}

function useGetOperationRequestHandler (): GetOperationRequestHandler {
  return getModule().useArticleDomainItemGetOperationRequestHandler();
}

// <---Store--- //

interface RunLoadActionOptions {
  readonly callback?: SetActionCallback;
  readonly dispatch: Dispatch<ActionUnion>;
  readonly payload: LoadActionPayload;
  readonly requestHandler: GetOperationRequestHandler;
  readonly shouldBeCanceled: ShouldBeCanceled;
  readonly sliceName: string;
}

async function runLoadAction ({
  callback,
  dispatch,
  shouldBeCanceled,
  sliceName,
  payload,
  requestHandler
}: RunLoadActionOptions) {
  if (shouldBeCanceled()) {
    return;
  }

  dispatch(createLoadAction(sliceName, payload));

  const response = payload
    ? await requestHandler.handle(createGetOperationRequest(payload), shouldBeCanceled)
    : null;

  if (shouldBeCanceled()) {
    return;
  }

  runLoadCompletedAction({ sliceName, dispatch, callback, payload: response });
}

export function useLoadActionDispatch (
  sliceName: string,
  {
    callback,
    dispatchType,
    isCanceled,
    payload
  }: LoadActionOptions = {}
): LoadActionDispatch {
  const dispatch = useDispatchContext();

  const requestHandler = useRef(useGetOperationRequestHandler()).current;

  useEffect(() => {
    let isCanceledInner = isCanceled ?? false;

    const shouldBeCanceledInner = () => isCanceledInner;

    if (dispatchType === StoreDispatchType.MountOrUpdate && payload) {
      runLoadAction({
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
        runLoadAction({
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
    run: async (payload: LoadActionPayload, shouldBeCanceled: ShouldBeCanceled = () => false) => {
      runLoadAction({
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
