import { type Dispatch, useEffect, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { type ShouldBeCanceled, StoreDispatchType } from '../../../../../../common';
import { type ApiResponseFactory, type ApiResponseResource } from '../../../../../../data';
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
  type ArticleItemStoreSlice,
} from '../../../../../../features';
import { ArticleItemStoreActionType } from '../../../ArticleItemStoreActionType';
import { type ArticleItemStoreActionUnion } from '../../../ArticleItemStoreActionUnion';
import { useArticleItemStoreDispatch } from '../../../ArticleItemStoreHooks';
import { runSaveCompletedAction } from '../SaveCompleted/ArticleItemStoreSaveCompletedActionDispatchHook';

interface Options {
  readonly callback?: ArticleItemStoreSetActionCallback;
  readonly dispatch: Dispatch<ArticleItemStoreActionUnion>;
  readonly factoryOfApiResponse: ApiResponseFactory;
  readonly payload: ArticleItemStoreSaveActionPayload;
  readonly requestHandler: ArticleDomainItemSaveOperationRequestHandler;
  readonly resourceOfApiResponse: ApiResponseResource;
  readonly resourceOfArticleItemStore: ArticleItemStoreResource;
  readonly shouldBeCanceled: ShouldBeCanceled;
  readonly slice: string;
}

async function runSaveAction ({
  callback,
  dispatch,
  factoryOfApiResponse,
  payload,
  requestHandler,
  resourceOfApiResponse,
  resourceOfArticleItemStore,
  shouldBeCanceled,
  slice,
}: Options): Promise<void> {
  if (shouldBeCanceled()) {
    return;
  }

  dispatch({
    type: ArticleItemStoreActionType.Save,
    payload,
    slice
  });

  const response = payload
    ? await requestHandler.handle(
        createArticleDomainItemSaveOperationRequest(
          payload,
          {
            factoryOfApiResponse,
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
    slice
  });
}

export function useStoreSaveActionDispatch (
  slice: ArticleItemStoreSlice,
  {
    callback,
    dispatchType,
    isCanceled,
    payloadOfSaveAction
  }: ArticleItemStoreSaveActionOptions
): ArticleItemStoreSaveActionDispatch {
  const { factories, hooks } = useAppInstance();

  const factoryOfApiResponse = factories.Data.Api.Response;

  const resourceOfApiResponse = hooks.Data.Api.Response.useResource();

  const resourceOfArticleItemStore = hooks.Features.Stores.Article.Item.useResource();

  const dispatch = useArticleItemStoreDispatch();

  const requestHandler = useRef(hooks.Domains.Article.useItemSaveOperationRequestHandler()).current;

  useEffect(
    () => {
      let isCanceledInner = isCanceled ?? false;

      const shouldBeCanceledInner = () => isCanceledInner;

      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfSaveAction) {
        runSaveAction({
          callback,
          dispatch,
          factoryOfApiResponse,
          payload: payloadOfSaveAction,
          requestHandler,
          resourceOfApiResponse,
          resourceOfArticleItemStore,
          shouldBeCanceled: shouldBeCanceledInner,
          slice
        });
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfSaveAction) {
          runSaveAction({
            callback,
            dispatch,
            factoryOfApiResponse,
            payload: payloadOfSaveAction,
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
      payloadOfSaveAction,
      requestHandler,
      resourceOfApiResponse,
      resourceOfArticleItemStore,
      slice
    ]
  );

  async function run (
    payload: ArticleItemStoreSaveActionPayload,
    shouldBeCanceled: ShouldBeCanceled = () => false
  ): Promise<void> {
    await runSaveAction({
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

  const result: ArticleItemStoreSaveActionDispatch = {
    run
  };

  return useRef(result).current;
}
