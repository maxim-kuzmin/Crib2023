import { type Dispatch, useEffect, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { type ShouldBeCanceled, StoreDispatchType } from '../../../../../../common';
import { type ApiResponseFactory, type ApiResponseResource } from '../../../../../../data';
import {
  type ArticleDomainItemGetOperationRequestHandler,
  createArticleDomainItemGetOperationRequest
} from '../../../../../../domains';
import {
  type ArticleItemStoreSetActionCallback,
  type ArticleItemStoreLoadActionDispatch,
  type ArticleItemStoreLoadActionOptions,
  type ArticleItemStoreLoadActionPayload,
  type ArticleItemStoreResource,
  type ArticleItemStoreSlice,
} from '../../../../../../features';
import { ArticleItemStoreActionType } from '../../../ArticleItemStoreActionType';
import { type ArticleItemStoreActionUnion } from '../../../ArticleItemStoreActionUnion';
import { useArticleItemStoreDispatch } from '../../../ArticleItemStoreHooks';
import { runLoadCompletedAction } from '../LoadCompleted/ArticleItemStoreLoadCompletedActionDispatchHook';

interface Options {
  readonly callback?: ArticleItemStoreSetActionCallback;
  readonly dispatch: Dispatch<ArticleItemStoreActionUnion>;
  readonly factoryOfApiResponse: ApiResponseFactory;
  readonly payload: ArticleItemStoreLoadActionPayload;
  readonly requestHandler: ArticleDomainItemGetOperationRequestHandler;
  readonly resourceOfApiResponse: ApiResponseResource;
  readonly resourceOfArticleItemStore: ArticleItemStoreResource;
  readonly shouldBeCanceled: ShouldBeCanceled;
  readonly slice: string;
}

async function runLoadAction ({
  callback,
  dispatch,
  factoryOfApiResponse,
  payload,
  requestHandler,
  resourceOfApiResponse,
  resourceOfArticleItemStore,
  shouldBeCanceled,
  slice,
}: Options) {
  if (shouldBeCanceled()) {
    return;
  }

  dispatch({
    payload,
    slice,
    type: ArticleItemStoreActionType.Load
  });

  const response = payload
    ? await requestHandler.handle(
        createArticleDomainItemGetOperationRequest(
          payload,
          {
            factoryOfApiResponse,
            operationName: resourceOfArticleItemStore.getOperationNameForGet(),
            resourceOfApiResponse
          }
        ),
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
    slice
  });
}

export function useStoreLoadActionDispatch (
  slice: ArticleItemStoreSlice,
  {
    callback,
    dispatchType,
    isCanceled,
    payloadOfLoadAction
  }: ArticleItemStoreLoadActionOptions = {}
): ArticleItemStoreLoadActionDispatch {
  const { factories, hooks } = useAppInstance();

  const factoryOfApiResponse = factories.Data.Api.Response;

  const resourceOfApiResponse = hooks.Data.Api.Response.useResource();

  const resourceOfArticleItemStore = hooks.Features.Stores.Article.Item.useResource();

  const dispatch = useArticleItemStoreDispatch();

  const requestHandler = useRef(hooks.Domains.Article.useItemGetOperationRequestHandler()).current;

  useEffect(
    () => {
      let isCanceledInner = isCanceled ?? false;

      const shouldBeCanceledInner = () => isCanceledInner;

      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfLoadAction) {
        runLoadAction({
          callback,
          dispatch,
          factoryOfApiResponse,
          payload: payloadOfLoadAction,
          requestHandler,
          resourceOfApiResponse,
          resourceOfArticleItemStore,
          shouldBeCanceled: shouldBeCanceledInner,
          slice
        });
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfLoadAction) {
          runLoadAction({
            callback,
            dispatch,
            factoryOfApiResponse,
            payload: payloadOfLoadAction,
            requestHandler,
            resourceOfApiResponse,
            resourceOfArticleItemStore,
            shouldBeCanceled: shouldBeCanceledInner,
            slice
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
      factoryOfApiResponse,
      isCanceled,
      payloadOfLoadAction,
      requestHandler,
      resourceOfApiResponse,
      resourceOfArticleItemStore,
      slice
    ]
  );

  async function run (
    payload: ArticleItemStoreLoadActionPayload,
    shouldBeCanceled: ShouldBeCanceled = () => false
  ): Promise<void> {
    await runLoadAction({
      callback,
      dispatch,
      factoryOfApiResponse,
      payload,
      requestHandler,
      resourceOfApiResponse,
      resourceOfArticleItemStore,
      shouldBeCanceled,
      slice
    });
  }

  const result: ArticleItemStoreLoadActionDispatch = {
    run
  };

  return useRef(result).current;
}
