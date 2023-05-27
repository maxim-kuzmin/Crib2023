import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { StoreDispatchType } from '../../../../../../common';
import { createArticleDomainItemSaveOperationRequest } from '../../../../../../domains';
import {
  type ArticleItemStoreSaveActionData,
  type ArticleItemStoreSaveActionDispatch,
  type ArticleItemStoreSaveActionOptions,
  type ArticleItemStoreSaveActionPayload,
  type ArticleItemStoreSaveActionResult,
  type ArticleItemStoreSliceName,
  createArticleItemStoreSaveActionData,
  createArticleItemStoreSaveActionPayload,
} from '../../../../../../features';
import { createArticleItemStoreSaveAction } from '../../../Actions';
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

  const dataOfSaveAction = useMemo(
    () => createArticleItemStoreSaveActionData({
      resourceOfApiResponse,
      resourceOfArticleItemStore,
      requestHandler,
    }),
    [requestHandler, resourceOfApiResponse, resourceOfArticleItemStore]
  );

  const payloadOfSaveAction = useMemo(
    () => createArticleItemStoreSaveActionPayload({
      actionResult: resultOfSaveAction,
      sliceName,
    }),
    [resultOfSaveAction, sliceName]
  );

  const { run: complete } = hooks.Features.Article.Item.Store.useStoreSaveCompletedActionDispatch(
    sliceName,
    { callback }
  );

  const run = useCallback(
    async (
      payload: ArticleItemStoreSaveActionPayload,
      dataOfSaveAction: ArticleItemStoreSaveActionData
    ) => {
      const {
        abortSignal,
        requestHandler,
        resourceOfApiResponse,
        resourceOfArticleItemStore
      } = dataOfSaveAction;

      const { actionResult } = payload;

      if (abortSignal?.aborted) {
        return;
      }

      dispatch(createArticleItemStoreSaveAction(payload));

      const response = actionResult
        ? await requestHandler.handle(
            createArticleDomainItemSaveOperationRequest(
              actionResult,
              {
                operationName: resourceOfArticleItemStore.getOperationNameForSave(),
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

      const dataOfSaveActionInner: ArticleItemStoreSaveActionData = {
        ...dataOfSaveAction,
        abortSignal: abortControllerInner.signal,
      };

      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        run(payloadOfSaveAction, dataOfSaveActionInner);
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          run(payloadOfSaveAction, dataOfSaveActionInner);
        } else {
          abortControllerInner.abort();
        }
      };
    },
    [aborted, dataOfSaveAction, dispatchType, payloadOfSaveAction, run]
  );

  return useMemo<ArticleItemStoreSaveActionDispatch>(
    () => ({
      run: async (actionResult: ArticleItemStoreSaveActionResult, abortSignal?: AbortSignal) => {
        const dataOfSaveActionInner = createArticleItemStoreSaveActionData({
          ...dataOfSaveAction,
          abortSignal,
        });

        const payloadOfSaveActionInner = createArticleItemStoreSaveActionPayload({
          ...payloadOfSaveAction,
          actionResult
        });

        await run(payloadOfSaveActionInner, dataOfSaveActionInner);
      }
    }),
    [dataOfSaveAction, payloadOfSaveAction, run]
  );
}
