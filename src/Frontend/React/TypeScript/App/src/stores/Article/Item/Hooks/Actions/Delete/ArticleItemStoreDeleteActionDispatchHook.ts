import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { StoreDispatchType } from '../../../../../../common';
import { createArticleDomainItemDeleteOperationRequest } from '../../../../../../domains';
import {
  type ArticleItemStoreDeleteActionData,
  type ArticleItemStoreDeleteActionDispatch,
  type ArticleItemStoreDeleteActionOptions,
  type ArticleItemStoreDeleteActionPayload,
  type ArticleItemStoreDeleteActionResult,
  type ArticleItemStoreSliceName,
  createArticleItemStoreDeleteActionData,
  createArticleItemStoreDeleteActionPayload,
} from '../../../../../../features';
import { createArticleItemStoreDeleteAction } from '../../../Actions';
import { useArticleItemStoreDispatch } from '../../../ArticleItemStoreHooks';

export function useStoreDeleteActionDispatch (
  sliceName: ArticleItemStoreSliceName,
  {
    callback,
    dispatchType,
    abortController,
    resultOfDeleteAction
  }: ArticleItemStoreDeleteActionOptions = {}
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

  const { run: complete } = hooks.Features.Article.Item.Store.useStoreDeleteCompletedActionDispatch(
    sliceName,
    { callback }
  );

  const run = useCallback(
    async (
      payload: ArticleItemStoreDeleteActionPayload,
      dataOfDeleteAction: ArticleItemStoreDeleteActionData
    ) => {
      const {
        abortSignal,
        requestHandler,
        resourceOfApiResponse,
        resourceOfArticleItemStore
      } = dataOfDeleteAction;

      const { actionResult } = payload;

      if (abortSignal?.aborted) {
        return;
      }

      dispatch(createArticleItemStoreDeleteAction(payload));

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
        run(payloadOfDeleteAction, dataOfDeleteActionInner);
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          run(payloadOfDeleteAction, dataOfDeleteActionInner);
        } else {
          abortControllerInner.abort();
        }
      };
    },
    [aborted, dataOfDeleteAction, dispatchType, payloadOfDeleteAction, run]
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

        await run(payloadOfDeleteActionInner, dataOfDeleteActionInner);
      }
    }),
    [dataOfDeleteAction, payloadOfDeleteAction, run]
  );
}
