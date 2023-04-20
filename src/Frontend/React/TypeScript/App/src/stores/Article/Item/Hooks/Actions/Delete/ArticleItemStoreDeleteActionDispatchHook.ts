import { type Dispatch, useEffect, useRef } from 'react';
import { getModule } from '../../../../../../app/ModuleImpl';
import {
  type ArticleItemStoreDeleteActionDispatch,
  type ArticleItemStoreDeleteActionOptions,
  type ArticleItemStoreDeleteActionPayload,
  type ArticleItemStoreDeleteCompletedActionCallback,
} from '../../../../../../app/Stores';
import { type ShouldBeCanceled, StoreDispatchType } from '../../../../../../common';
import {
  type ArticleDomainItemGetOperationInput,
  type ArticleDomainItemDeleteOperationRequestHandler,
  createArticleDomainItemDeleteOperationRequest,
} from '../../../../../../domains';
import { type ArticleItemStoreDeleteAction } from '../../../Actions';
import { ArticleItemStoreActionType } from '../../../ArticleItemStoreActionType';
import { useArticleItemStoreDispatchContext } from '../../../ArticleItemStoreContext';
import { type ArticleItemStoreActionUnion } from '../../../ArticleItemStoreActionUnion';
import { runDeleteCompletedAction } from '../DeleteCompleted/ArticleItemStoreDeleteCompletedActionDispatchHook';

// ---Store---> //

type ActionUnion = ArticleItemStoreActionUnion;

type DeleteAction = ArticleItemStoreDeleteAction;
type DeleteActionDispatch = ArticleItemStoreDeleteActionDispatch;
type DeleteActionOptions = ArticleItemStoreDeleteActionOptions;
type DeleteActionPayload = ArticleItemStoreDeleteActionPayload;

type DeleteCompletedActionCallback = ArticleItemStoreDeleteCompletedActionCallback;

type DeleteOperationRequestHandler = ArticleDomainItemDeleteOperationRequestHandler;

function createDeleteAction (sliceName: string, payload: DeleteActionPayload): DeleteAction {
  return {
    type: ArticleItemStoreActionType.Delete,
    payload,
    sliceName
  };
};

function createDeleteOperationRequest (
  input: ArticleDomainItemGetOperationInput,
  operationCode?: string
) {
  return createArticleDomainItemDeleteOperationRequest(input, operationCode);
}

function useDispatchContext (): Dispatch<ActionUnion> {
  return useArticleItemStoreDispatchContext();
}

function useDeleteOperationRequestHandler (): DeleteOperationRequestHandler {
  return getModule().useArticleDomainItemDeleteOperationRequestHandler();
}

// <---Store--- //

interface RunDeleteActionOptions {
  readonly callback?: DeleteCompletedActionCallback;
  readonly dispatch: Dispatch<ActionUnion>;
  readonly payload: DeleteActionPayload;
  readonly requestHandler: DeleteOperationRequestHandler;
  readonly shouldBeCanceled: ShouldBeCanceled;
  readonly sliceName: string;
}

async function runDeleteAction ({
  callback,
  dispatch,
  shouldBeCanceled,
  sliceName,
  payload,
  requestHandler
}: RunDeleteActionOptions) {
  if (shouldBeCanceled()) {
    return;
  }

  dispatch(createDeleteAction(sliceName, payload));

  const response = payload
    ? await requestHandler.handle(createDeleteOperationRequest(payload), shouldBeCanceled)
    : null;

  if (shouldBeCanceled()) {
    return;
  }

  runDeleteCompletedAction({ sliceName, dispatch, callback, payload: response });
}

export function useDeleteActionDispatch (
  sliceName: string,
  {
    callback,
    dispatchType,
    isCanceled,
    payload
  }: DeleteActionOptions = {}
): DeleteActionDispatch {
  const dispatch = useDispatchContext();

  const requestHandler = useRef(useDeleteOperationRequestHandler()).current;

  useEffect(() => {
    let isCanceledInner = isCanceled ?? false;

    const shouldBeCanceledInner = () => isCanceledInner;

    if (dispatchType === StoreDispatchType.MountOrUpdate && payload) {
      runDeleteAction({
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
        runDeleteAction({
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
    run: async (payload: DeleteActionPayload, shouldBeCanceled: ShouldBeCanceled = () => false) => {
      runDeleteAction({
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
