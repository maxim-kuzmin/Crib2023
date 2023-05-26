import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { StoreDispatchType } from '../../../../../../common';
import { createArticleDomainItemDeleteOperationRequest } from '../../../../../../domains';
import {
  type ArticleItemStoreDeleteActionDispatch,
  type ArticleItemStoreDeleteActionOptions,
  type ArticleItemStoreDeleteActionPayload,
  type ArticleItemStoreDeleteActionResult,
  type ArticleItemStoreSliceName,
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

  const payloadOfDeleteAction = useMemo(
    () => createArticleItemStoreDeleteActionPayload({
      actionResult: resultOfDeleteAction,
      resourceOfApiResponse,
      resourceOfArticleItemStore,
      requestHandler,
      sliceName,
    }),
    [resultOfDeleteAction, requestHandler, resourceOfApiResponse, resourceOfArticleItemStore, sliceName]
  );

  const { run: complete } = hooks.Features.Article.Item.Store.useStoreDeleteCompletedActionDispatch(
    sliceName,
    { callback }
  );

  const run = useCallback(
    async (payload: ArticleItemStoreDeleteActionPayload) => {
      const {
        abortSignal,
        actionResult,
        requestHandler,
        resourceOfApiResponse,
        resourceOfArticleItemStore
      } = payload;

      if (abortSignal?.aborted) {
        return;
      }

      dispatch(createArticleItemStoreDeleteAction({ payload }));

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

  useEffect(
    () => {
      if (abortController?.signal.aborted) {
        return;
      }

      const abortControllerInner = new AbortController();

      const payloadOfDeleteActionInner = createArticleItemStoreDeleteActionPayload({
        ...payloadOfDeleteAction,
        abortSignal: abortControllerInner.signal,
      });

      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        run(payloadOfDeleteActionInner);
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          run(payloadOfDeleteActionInner);
        } else {
          abortControllerInner.abort();
        }
      };
    },
    [abortController, dispatchType, payloadOfDeleteAction, run]
  );

  return useMemo<ArticleItemStoreDeleteActionDispatch>(
    () => ({
      run: async (actionResult: ArticleItemStoreDeleteActionResult, abortSignal?: AbortSignal) => {
        const payloadOfDeleteActionInner = createArticleItemStoreDeleteActionPayload({
          ...payloadOfDeleteAction,
          abortSignal,
          actionResult
        });

        await run(payloadOfDeleteActionInner);
      }
    }),
    [payloadOfDeleteAction, run]
  );
}
