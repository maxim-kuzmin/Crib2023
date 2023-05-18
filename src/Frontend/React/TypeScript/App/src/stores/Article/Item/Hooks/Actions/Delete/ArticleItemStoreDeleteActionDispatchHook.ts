import { type Dispatch, useEffect, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { type ShouldBeCanceled, StoreDispatchType } from '../../../../../../common';
import { type ApiResponseResource } from '../../../../../../data';
import {
  type ArticleDomainItemDeleteOperationRequestHandler,
  createArticleDomainItemDeleteOperationRequest,
} from '../../../../../../domains';
import {
  type ArticleItemStoreDeleteCompletedActionCallback,
  type ArticleItemStoreDeleteActionDispatch,
  type ArticleItemStoreDeleteActionOptions,
  type ArticleItemStoreDeleteActionPayload,
  type ArticleItemStoreResource,
  type ArticleItemStoreSliceName,
} from '../../../../../../features';
import { ArticleItemStoreActionType } from '../../../ArticleItemStoreActionType';
import { type ArticleItemStoreActionUnion } from '../../../ArticleItemStoreActionUnion';
import { useArticleItemStoreDispatch } from '../../../ArticleItemStoreHooks';
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
  sliceName: ArticleItemStoreSliceName,
  {
    callback,
    dispatchType,
    isCanceled,
    payloadOfDeleteAction
  }: ArticleItemStoreDeleteActionOptions = {}
): ArticleItemStoreDeleteActionDispatch {
  const { hooks } = useAppInstance();

  const resourceOfApiResponse = hooks.Data.Api.Response.useResource();

  const resourceOfArticleItemStore = hooks.Features.Article.Item.Store.useResource();

  const dispatch = useArticleItemStoreDispatch();

  const requestHandler = useRef(hooks.Domains.Article.useItemDeleteOperationRequestHandler()).current;

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
