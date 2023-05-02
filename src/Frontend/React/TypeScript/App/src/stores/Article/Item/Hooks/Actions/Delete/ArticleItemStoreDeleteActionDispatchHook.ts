import { type Dispatch, useEffect, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { type ShouldBeCanceled, StoreDispatchType } from '../../../../../../common';
import { type ApiResponseFactory, type ApiResponseResource } from '../../../../../../data';
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
} from '../../../../../../features';
import { ArticleItemStoreActionType } from '../../../ArticleItemStoreActionType';
import { type ArticleItemStoreActionUnion } from '../../../ArticleItemStoreActionUnion';
import { useArticleItemStoreDispatch } from '../../../ArticleItemStoreHooks';
import { runDeleteCompletedAction } from '../DeleteCompleted/ArticleItemStoreDeleteCompletedActionDispatchHook';

interface Options {
  readonly callback?: ArticleItemStoreDeleteCompletedActionCallback;
  readonly dispatch: Dispatch<ArticleItemStoreActionUnion>;
  readonly factoryOfApiResponse: ApiResponseFactory;
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
  factoryOfApiResponse,
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
            factoryOfApiResponse,
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
  const { factories, hooks } = useAppInstance();

  const factoryOfApiResponse = factories.Data.Api.Response;

  const resourceOfApiResponse = hooks.Data.Api.Response.useResource();

  const resourceOfArticleItemStore = hooks.Features.Stores.Article.Item.useResource();

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
          factoryOfApiResponse,
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
            factoryOfApiResponse,
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
      factoryOfApiResponse,
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
      factoryOfApiResponse,
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
