import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { type StoreActionOptions, StoreDispatchType } from '../../../../../../common';
import { createArticleDomainItemSaveOperationRequest } from '../../../../../../domains';
import {
  type ArticleItemStoreSetActionCallback,
  type ArticleItemStoreSaveActionData,
  type ArticleItemStoreSaveActionDispatch,
  type ArticleItemStoreSaveActionPayload,
  type ArticleItemStoreSaveActionResult,
  type ArticleItemStoreSliceName,
  createArticleItemStoreSaveActionData,
  createArticleItemStoreSaveActionPayload,
} from '../../../../../../features';
import { createArticleItemStoreSaveAction } from '../../../Actions';
import { useArticleItemStoreDispatch } from '../../../ArticleItemStoreHooks';
import {
  useStoreSaveCompletedActionDispatch
} from '../SaveCompleted/ArticleItemStoreSaveCompletedActionDispatchHook';

interface Options extends StoreActionOptions {
  readonly callback?: ArticleItemStoreSetActionCallback;
  readonly resultOfSaveAction?: ArticleItemStoreSaveActionResult;
}

export function useStoreSaveActionDispatch (
  sliceName: ArticleItemStoreSliceName,
  {
    callback,
    dispatchType,
    abortController,
    resultOfSaveAction
  }: Options = {}
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

  const { run: complete } = useStoreSaveCompletedActionDispatch(sliceName, { callback });

  const runInner = useCallback(
    async (payload: ArticleItemStoreSaveActionPayload, data: ArticleItemStoreSaveActionData) => {
      const {
        abortSignal,
        requestHandler,
        resourceOfApiResponse,
        resourceOfArticleItemStore
      } = data;

      if (abortSignal?.aborted) {
        return;
      }

      dispatch(createArticleItemStoreSaveAction(payload));

      const { actionResult } = payload;

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
        runInner(payloadOfSaveAction, dataOfSaveActionInner);
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          runInner(payloadOfSaveAction, dataOfSaveActionInner);
        } else {
          abortControllerInner.abort();
        }
      };
    },
    [aborted, dataOfSaveAction, dispatchType, payloadOfSaveAction, runInner]
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

        await runInner(payloadOfSaveActionInner, dataOfSaveActionInner);
      }
    }),
    [dataOfSaveAction, payloadOfSaveAction, runInner]
  );
}
