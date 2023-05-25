import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { StoreDispatchType } from '../../../../../../common';
import { createArticleDomainItemSaveOperationRequest } from '../../../../../../domains';
import {
  type ArticleItemStoreSaveActionDispatch,
  type ArticleItemStoreSaveActionOptions,
  type ArticleItemStoreSaveActionPayload,
  type ArticleItemStoreSliceName,
  type ArticleItemStoreSaveActionResult,
  createArticleItemStoreSaveActionPayload,
} from '../../../../../../features';
import { ArticleItemStoreActionType } from '../../../ArticleItemStoreActionType';
import { useArticleItemStoreDispatch } from '../../../ArticleItemStoreHooks';

export function useStoreSaveActionDispatch (
  sliceName: ArticleItemStoreSliceName,
  {
    callback,
    dispatchType,
    abortController,
    resultOfSaveAction
  }: ArticleItemStoreSaveActionOptions = {}
): ArticleItemStoreSaveActionDispatch {
  const dispatch = useArticleItemStoreDispatch();

  const { hooks } = useAppInstance();

  const resourceOfApiResponse = hooks.Data.Api.Response.useResource();
  const resourceOfArticleItemStore = hooks.Features.Article.Item.Store.useResource();
  const requestHandler = useRef(hooks.Domains.Article.useItemSaveOperationRequestHandler()).current;

  const payloadOfSaveAction = useMemo(
    () => createArticleItemStoreSaveActionPayload({
      actionResult: resultOfSaveAction,
      resourceOfApiResponse,
      resourceOfArticleItemStore,
      requestHandler
    }),
    [resultOfSaveAction, requestHandler, resourceOfApiResponse, resourceOfArticleItemStore]
  );

  const { run: complete } = hooks.Features.Article.Item.Store.useStoreSaveCompletedActionDispatch(
    sliceName,
    { callback }
  );

  const run = useCallback(
    async (payload: ArticleItemStoreSaveActionPayload) => {
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

      dispatch({ payload, sliceName, type: ArticleItemStoreActionType.Save });

      const response = actionResult
        ? await requestHandler.handle(
            createArticleDomainItemSaveOperationRequest(
              actionResult,
              {
                operationName: resourceOfArticleItemStore.getOperationNameForGet(),
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
    [complete, dispatch, sliceName]
  );

  useEffect(
    () => {
      if (abortController?.signal.aborted) {
        return;
      }

      const abortControllerInner = new AbortController();

      const payloadOfSaveActionInner = createArticleItemStoreSaveActionPayload({
        ...payloadOfSaveAction,
        abortSignal: abortControllerInner.signal,
      });

      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        run(payloadOfSaveActionInner);
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          run(payloadOfSaveActionInner);
        } else {
          abortControllerInner.abort();
        }
      };
    },
    [abortController, dispatchType, payloadOfSaveAction, run]
  );

  return useMemo<ArticleItemStoreSaveActionDispatch>(
    () => ({
      run: async (actionResult: ArticleItemStoreSaveActionResult, abortSignal?: AbortSignal) => {
        const payloadOfSaveActionInner = createArticleItemStoreSaveActionPayload({
          ...payloadOfSaveAction,
          abortSignal,
          actionResult
        });

        await run(payloadOfSaveActionInner);
      }
    }),
    [payloadOfSaveAction, run]
  );
}
