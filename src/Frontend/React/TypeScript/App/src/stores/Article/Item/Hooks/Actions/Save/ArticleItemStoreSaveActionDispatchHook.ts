import { type Dispatch, useEffect, useRef } from 'react';
import { getModule } from '../../../../../../app';
import {
  type ArticleItemStoreSetActionCallback,
  type ArticleItemStoreSaveActionDispatch,
  type ArticleItemStoreSaveActionOptions,
  type ArticleItemStoreSaveActionPayload,
} from '../../../../../../app/Stores';
import { type ShouldBeCanceled, StoreDispatchType } from '../../../../../../common';
import {
  type ArticleDomainItemSaveOperationRequestHandler,
  createArticleDomainItemSaveOperationRequest
} from '../../../../../../domains';
import { ArticleItemStoreActionType } from '../../../ArticleItemStoreActionType';
import { type ArticleItemStoreActionUnion } from '../../../ArticleItemStoreActionUnion';
import { useArticleItemStoreDispatchContext } from '../../../ArticleItemStoreContext';
import { runSaveCompletedAction } from '../SaveCompleted/ArticleItemStoreSaveCompletedActionDispatchHook';

interface RunOptions {
  readonly callback?: ArticleItemStoreSetActionCallback;
  readonly dispatch: Dispatch<ArticleItemStoreActionUnion>;
  readonly payload: ArticleItemStoreSaveActionPayload;
  readonly requestHandler: ArticleDomainItemSaveOperationRequestHandler;
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
}: RunOptions): Promise<void> {
  if (shouldBeCanceled()) {
    return;
  }

  dispatch({
    type: ArticleItemStoreActionType.Save,
    payload,
    sliceName
  });

  const response = payload
    ? await requestHandler.handle(
        createArticleDomainItemSaveOperationRequest(payload, { operationName: '@@ArticleDomainItemSave' }),
        shouldBeCanceled
      )
    : null;

  if (shouldBeCanceled()) {
    return;
  }

  runSaveCompletedAction({
    callback,
    dispatch,
    payload: response,
    sliceName
  });
}

export function useSaveActionDispatch (
  sliceName: string,
  {
    callback,
    dispatchType,
    isCanceled,
    payloadOfSaveAction
  }: ArticleItemStoreSaveActionOptions
): ArticleItemStoreSaveActionDispatch {
  const dispatch = useArticleItemStoreDispatchContext();

  const requestHandler = useRef(
    getModule().useArticleDomainItemSaveOperationRequestHandler()
  ).current;

  useEffect(
    () => {
      let isCanceledInner = isCanceled ?? false;

      const shouldBeCanceledInner = () => isCanceledInner;

      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfSaveAction) {
        runSaveAction({
          callback,
          dispatch,
          payload: payloadOfSaveAction,
          requestHandler,
          shouldBeCanceled: shouldBeCanceledInner,
          sliceName
        });
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfSaveAction) {
          runSaveAction({
            callback,
            dispatch,
            payload: payloadOfSaveAction,
            requestHandler,
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
      payloadOfSaveAction,
      requestHandler,
      sliceName
    ]
  );

  async function run (
    payload: ArticleItemStoreSaveActionPayload,
    shouldBeCanceled: ShouldBeCanceled = () => false
  ): Promise<void> {
    await runSaveAction({
      callback,
      dispatch,
      payload,
      requestHandler,
      shouldBeCanceled,
      sliceName
    });
  }

  const result: ArticleItemStoreSaveActionDispatch = {
    run
  };

  return useRef(result).current;
}
