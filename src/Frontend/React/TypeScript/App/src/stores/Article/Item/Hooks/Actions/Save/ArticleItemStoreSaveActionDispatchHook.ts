import { type Dispatch, useEffect, useRef } from 'react';
import appInstance from '../../../../../../app/AppInstance';
import { type ShouldBeCanceled, StoreDispatchType } from '../../../../../../common';
import { type ApiResponseResource } from '../../../../../../data';
import {
  type ArticleDomainItemSaveOperationRequestHandler,
  createArticleDomainItemSaveOperationRequest
} from '../../../../../../domains';
import {
  type ArticleItemStoreSetActionCallback,
  type ArticleItemStoreSaveActionDispatch,
  type ArticleItemStoreSaveActionOptions,
  type ArticleItemStoreSaveActionPayload,
  type ArticleItemStoreResource,
} from '../../../../../../features';
import { ArticleItemStoreActionType } from '../../../ArticleItemStoreActionType';
import { type ArticleItemStoreActionUnion } from '../../../ArticleItemStoreActionUnion';
import { useArticleItemStoreDispatchContext } from '../../../ArticleItemStoreContext';
import { runSaveCompletedAction } from '../SaveCompleted/ArticleItemStoreSaveCompletedActionDispatchHook';

interface Options {
  readonly callback?: ArticleItemStoreSetActionCallback;
  readonly dispatch: Dispatch<ArticleItemStoreActionUnion>;
  readonly payload: ArticleItemStoreSaveActionPayload;
  readonly requestHandler: ArticleDomainItemSaveOperationRequestHandler;
  readonly resourceOfApiResponse: ApiResponseResource;
  readonly resourceOfArticleItemStore: ArticleItemStoreResource;
  readonly shouldBeCanceled: ShouldBeCanceled;
  readonly sliceName: string;
}

async function runSaveAction ({
  callback,
  dispatch,
  payload,
  requestHandler,
  resourceOfApiResponse,
  resourceOfArticleItemStore,
  shouldBeCanceled,
  sliceName,
}: Options): Promise<void> {
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
        createArticleDomainItemSaveOperationRequest(
          payload,
          {
            operationName: resourceOfArticleItemStore.getOperationNameForSave(),
            resourceOfApiResponse
          }
        ),
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

export function useStoreSaveActionDispatch (
  sliceName: string,
  {
    callback,
    dispatchType,
    isCanceled,
    payloadOfSaveAction
  }: ArticleItemStoreSaveActionOptions
): ArticleItemStoreSaveActionDispatch {
  const resourceOfApiResponse = appInstance.hooks.Data.Api.Response.useResource();

  const resourceOfArticleItemStore = appInstance.hooks.Features.Stores.Article.Item.useResource();

  const dispatch = useArticleItemStoreDispatchContext();

  const requestHandler = useRef(appInstance.hooks.Domains.Article.useItemSaveOperationRequestHandler()).current;

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
          resourceOfApiResponse,
          resourceOfArticleItemStore,
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
            resourceOfApiResponse,
            resourceOfArticleItemStore,
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
      resourceOfApiResponse,
      resourceOfArticleItemStore,
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
      resourceOfApiResponse,
      resourceOfArticleItemStore,
      shouldBeCanceled,
      sliceName
    });
  }

  const result: ArticleItemStoreSaveActionDispatch = {
    run
  };

  return useRef(result).current;
}
