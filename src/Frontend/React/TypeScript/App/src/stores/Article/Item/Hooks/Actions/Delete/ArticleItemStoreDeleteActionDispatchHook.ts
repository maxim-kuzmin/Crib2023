import { type Dispatch, useEffect, useRef } from 'react';
import app, {
  type ArticleItemStoreDeleteCompletedActionCallback,
  type ArticleItemStoreDeleteActionDispatch,
  type ArticleItemStoreDeleteActionOptions,
  type ArticleItemStoreDeleteActionPayload,
  type ArticleItemStoreResource,
} from '../../../../../../app';
import { type ShouldBeCanceled, StoreDispatchType } from '../../../../../../common';
import { type ApiResponseResource } from '../../../../../../data';
import {
  type ArticleDomainItemDeleteOperationRequestHandler,
  createArticleDomainItemDeleteOperationRequest,
} from '../../../../../../domains';
import { ArticleItemStoreActionType } from '../../../ArticleItemStoreActionType';
import { type ArticleItemStoreActionUnion } from '../../../ArticleItemStoreActionUnion';
import { useArticleItemStoreDispatchContext } from '../../../ArticleItemStoreContext';
import { runDeleteCompletedAction } from '../DeleteCompleted/ArticleItemStoreDeleteCompletedActionDispatchHook';

interface Options {
  readonly callback?: ArticleItemStoreDeleteCompletedActionCallback;
  readonly dispatch: Dispatch<ArticleItemStoreActionUnion>;
  readonly payload: ArticleItemStoreDeleteActionPayload;
  readonly requestHandler: ArticleDomainItemDeleteOperationRequestHandler;
  readonly resourceOfApiResponse: ApiResponseResource;
  readonly resourceOfArticleItemStore: ArticleItemStoreResource;
  readonly shouldBeCanceled: ShouldBeCanceled;
  readonly sliceName: string;
}

async function runDeleteAction ({
  callback,
  dispatch,
  payload,
  requestHandler,
  resourceOfApiResponse,
  resourceOfArticleItemStore,
  shouldBeCanceled,
  sliceName,
}: Options) {
  if (shouldBeCanceled()) {
    return;
  }

  dispatch({
    payload,
    sliceName,
    type: ArticleItemStoreActionType.Delete
  });

  const response = payload
    ? await requestHandler.handle(
        createArticleDomainItemDeleteOperationRequest(
          payload,
          {
            operationName: resourceOfArticleItemStore.getOperationNameForDelete(),
            resourceOfApiResponse
          }
        ),
        shouldBeCanceled
      )
    : null;

  if (shouldBeCanceled()) {
    return;
  }

  runDeleteCompletedAction({
    callback,
    dispatch,
    payload: response,
    sliceName
  });
}

export function useStoreDeleteActionDispatch (
  sliceName: string,
  {
    callback,
    dispatchType,
    isCanceled,
    payloadOfDeleteAction
  }: ArticleItemStoreDeleteActionOptions = {}
): ArticleItemStoreDeleteActionDispatch {
  const resourceOfApiResponse = app.hooks.Api.Response.useResource();

  const resourceOfArticleItemStore = app.hooks.Stores.Article.Item.useResource();

  const dispatch = useArticleItemStoreDispatchContext();

  const requestHandler = useRef(app.hooks.Domains.Article.useItemDeleteOperationRequestHandler()).current;

  useEffect(
    () => {
      let isCanceledInner = isCanceled ?? false;

      const shouldBeCanceledInner = () => isCanceledInner;

      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfDeleteAction) {
        runDeleteAction({
          callback,
          dispatch,
          payload: payloadOfDeleteAction,
          requestHandler,
          resourceOfApiResponse,
          resourceOfArticleItemStore,
          shouldBeCanceled: shouldBeCanceledInner,
          sliceName
      });
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfDeleteAction) {
          runDeleteAction({
            callback,
            dispatch,
            payload: payloadOfDeleteAction,
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
      payloadOfDeleteAction,
      requestHandler,
      resourceOfApiResponse,
      resourceOfArticleItemStore,
      sliceName
    ]
  );

  async function run (
    payload: ArticleItemStoreDeleteActionPayload,
    shouldBeCanceled: ShouldBeCanceled = () => false
  ): Promise<void> {
    await runDeleteAction({
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

  const result: ArticleItemStoreDeleteActionDispatch = {
    run
  };

  return useRef(result).current;
}
