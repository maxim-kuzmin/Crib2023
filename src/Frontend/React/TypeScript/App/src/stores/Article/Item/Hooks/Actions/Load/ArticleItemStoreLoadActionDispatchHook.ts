import { type Dispatch, useEffect, useRef } from 'react';
import { getModule } from '../../../../../../app/ModuleImpl';
import {
  type ArticleItemStoreSetActionCallback,
  type ArticleItemStoreLoadActionDispatch,
  type ArticleItemStoreLoadActionOptions,
  type ArticleItemStoreLoadActionPayload,
} from '../../../../../../app/Stores';
import { type ShouldBeCanceled, StoreDispatchType } from '../../../../../../common';
import {
  type ArticleDomainItemGetOperationRequestHandler,
  createArticleDomainItemGetOperationRequest
} from '../../../../../../domains';
import { ArticleItemStoreActionType } from '../../../ArticleItemStoreActionType';
import { type ArticleItemStoreActionUnion } from '../../../ArticleItemStoreActionUnion';
import { useArticleItemStoreDispatchContext } from '../../../ArticleItemStoreContext';
import { runLoadCompletedAction } from '../LoadCompleted/ArticleItemStoreLoadCompletedActionDispatchHook';

interface RunOptions {
  readonly callback?: ArticleItemStoreSetActionCallback;
  readonly dispatch: Dispatch<ArticleItemStoreActionUnion>;
  readonly payload: ArticleItemStoreLoadActionPayload;
  readonly requestHandler: ArticleDomainItemGetOperationRequestHandler;
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
}: RunOptions) {
  if (shouldBeCanceled()) {
    return;
  }

  dispatch({
    payload,
    sliceName,
    type: ArticleItemStoreActionType.Load
  });

  const response = payload
    ? await requestHandler.handle(
        createArticleDomainItemGetOperationRequest(payload),
        shouldBeCanceled
      )
    : null;

  if (shouldBeCanceled()) {
    return;
  }

  runLoadCompletedAction({
    callback,
    dispatch,
    payload: response,
    sliceName
  });
}

export function useLoadActionDispatch (
  sliceName: string,
  {
    callback,
    dispatchType,
    isCanceled,
    payloadOfLoadAction
  }: ArticleItemStoreLoadActionOptions = {}
): ArticleItemStoreLoadActionDispatch {
  const dispatch = useArticleItemStoreDispatchContext();

  const requestHandler = useRef(
    getModule().useArticleDomainItemGetOperationRequestHandler()
  ).current;

  useEffect(
    () => {
      let isCanceledInner = isCanceled ?? false;

      const shouldBeCanceledInner = () => isCanceledInner;

      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfLoadAction) {
        runLoadAction({
          callback,
          dispatch,
          requestHandler,
          payload: payloadOfLoadAction,
          shouldBeCanceled: shouldBeCanceledInner,
          sliceName
        });
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfLoadAction) {
          runLoadAction({
            callback,
            dispatch,
            requestHandler,
            payload: payloadOfLoadAction,
            shouldBeCanceled: shouldBeCanceledInner,
            sliceName
            });
        } else {
          isCanceledInner = true;
        }
      };
    },
    [
      callback,
      dispatch,
      dispatchType,
      isCanceled,
      payloadOfLoadAction,
      requestHandler,
      sliceName
    ]
  );

  async function run (
    payload: ArticleItemStoreLoadActionPayload,
    shouldBeCanceled: ShouldBeCanceled = () => false
  ): Promise<void> {
    await runLoadAction({
      callback,
      dispatch,
      payload,
      requestHandler,
      shouldBeCanceled,
      sliceName
    });
  }

  const result: ArticleItemStoreLoadActionDispatch = {
    run
  };

  return useRef(result).current;
}
