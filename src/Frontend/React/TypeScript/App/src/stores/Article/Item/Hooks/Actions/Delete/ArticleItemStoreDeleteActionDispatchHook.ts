import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { type StoreActionOptions, StoreDispatchType } from '../../../../../../common';
import { createArticleDomainItemDeleteOperationRequest } from '../../../../../../domains';
import {
  type ArticleItemStoreDeleteActionData,
  type ArticleItemStoreDeleteActionDispatch,
  type ArticleItemStoreDeleteActionPayload,
  type ArticleItemStoreDeleteActionResult,
  type ArticleItemStoreSliceName,
  createArticleItemStoreDeleteActionData,
  createArticleItemStoreDeleteActionPayload,
} from '../../../../../../features';
import { createArticleItemStoreDeleteAction } from '../../../Actions';
import { useArticleItemStoreDispatch } from '../../../ArticleItemStoreHooks';
import {
  useStoreDeleteCompletedActionDispatch
} from '../DeleteCompleted/ArticleItemStoreDeleteCompletedActionDispatchHook';

interface Options extends StoreActionOptions {
  readonly resultOfDeleteAction?: ArticleItemStoreDeleteActionResult;
}

export function useStoreDeleteActionDispatch (
  sliceName: ArticleItemStoreSliceName,
  {
    dispatchType,
    abortController,
    resultOfDeleteAction
  }: Options = {}
): ArticleItemStoreDeleteActionDispatch {
  const dispatch = useArticleItemStoreDispatch();

  const { hooks } = useAppInstance();

  const resourceOfApiResponse = hooks.Data.Api.Response.useResource();
  const resourceOfArticleItemStore = hooks.Features.Article.Item.Store.useResource();
  const requestHandler = useRef(hooks.Domains.Article.useItemDeleteOperationRequestHandler()).current;

  const dataOfDeleteAction = useMemo(
    () => createArticleItemStoreDeleteActionData({
      resourceOfApiResponse,
      resourceOfArticleItemStore,
      requestHandler,
    }),
    [requestHandler, resourceOfApiResponse, resourceOfArticleItemStore]
  );

  const payloadOfDeleteAction = useMemo(
    () => createArticleItemStoreDeleteActionPayload({
      actionResult: resultOfDeleteAction,
      sliceName,
    }),
    [resultOfDeleteAction, sliceName]
  );

  const { run: complete } = useStoreDeleteCompletedActionDispatch(sliceName);

  const runInner = useCallback(
    async (payload: ArticleItemStoreDeleteActionPayload, data: ArticleItemStoreDeleteActionData) => {
      const {
        abortSignal,
        requestHandler,
        resourceOfApiResponse,
        resourceOfArticleItemStore
      } = data;

      if (abortSignal?.aborted) {
        return;
      }

      dispatch(createArticleItemStoreDeleteAction(payload));

      const { actionResult } = payload;

      const response = actionResult
        ? await requestHandler.handle(
          createArticleDomainItemDeleteOperationRequest(
              actionResult,
              {
                operationName: resourceOfArticleItemStore.getOperationNameForDelete(),
                resourceOfApiResponse
              }
            ),
            abortSignal
          )
        : null;

      if (abortSignal?.aborted) {
        return;
      }

      complete(response);
    },
    [complete, dispatch]
  );

  const aborted = abortController?.signal.aborted;

  useEffect(
    () => {
      if (aborted) {
        return;
      }

      const abortControllerInner = new AbortController();

      const dataOfDeleteActionInner: ArticleItemStoreDeleteActionData = {
        ...dataOfDeleteAction,
        abortSignal: abortControllerInner.signal,
      };

      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        runInner(payloadOfDeleteAction, dataOfDeleteActionInner);
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          runInner(payloadOfDeleteAction, dataOfDeleteActionInner);
        } else {
          abortControllerInner.abort();
        }
      };
    },
    [aborted, dataOfDeleteAction, dispatchType, payloadOfDeleteAction, runInner]
  );

  return useMemo<ArticleItemStoreDeleteActionDispatch>(
    () => ({
      run: async (actionResult: ArticleItemStoreDeleteActionResult, abortSignal?: AbortSignal) => {
        const dataOfDeleteActionInner = createArticleItemStoreDeleteActionData({
          ...dataOfDeleteAction,
          abortSignal,
        });

        const payloadOfDeleteActionInner = createArticleItemStoreDeleteActionPayload({
          ...payloadOfDeleteAction,
          actionResult
        });

        await runInner(payloadOfDeleteActionInner, dataOfDeleteActionInner);
      }
    }),
    [dataOfDeleteAction, payloadOfDeleteAction, runInner]
  );
}
