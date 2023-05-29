import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { type StoreActionOptions, StoreDispatchType } from '../../../../../../common';
import { createArticleDomainItemGetOperationRequest } from '../../../../../../domains';
import {
  type ArticleItemStoreLoadActionData,
  type ArticleItemStoreLoadActionDispatch,
  type ArticleItemStoreLoadActionPayload,
  type ArticleItemStoreLoadActionResult,
  type ArticleItemStoreSliceName,
  createArticleItemStoreLoadActionData,
  createArticleItemStoreLoadActionPayload,
} from '../../../../../../features';
import { createArticleItemStoreLoadAction } from '../../../Actions';
import { useArticleItemStoreDispatch } from '../../../ArticleItemStoreHooks';
import {
  useStoreLoadCompletedActionDispatch
} from '../LoadCompleted/ArticleItemStoreLoadCompletedActionDispatchHook';

interface Options extends StoreActionOptions {
  readonly resultOfLoadAction?: ArticleItemStoreLoadActionResult;
}

export function useStoreLoadActionDispatch (
  sliceName: ArticleItemStoreSliceName,
  {
    dispatchType,
    abortController,
    resultOfLoadAction
  }: Options = {}
): ArticleItemStoreLoadActionDispatch {
  const dispatch = useArticleItemStoreDispatch();

  const { hooks } = useAppInstance();

  const resourceOfApiResponse = hooks.Data.Api.Response.useResource();
  const resourceOfArticleItemStore = hooks.Features.Article.Item.Store.useResource();
  const requestHandler = useRef(hooks.Domains.Article.useItemGetOperationRequestHandler()).current;

  const dataOfLoadAction = useMemo(
    () => createArticleItemStoreLoadActionData({
      resourceOfApiResponse,
      resourceOfArticleItemStore,
      requestHandler,
    }),
    [requestHandler, resourceOfApiResponse, resourceOfArticleItemStore]
  );

  const payloadOfLoadAction = useMemo(
    () => createArticleItemStoreLoadActionPayload({
      actionResult: resultOfLoadAction,
      sliceName,
    }),
    [resultOfLoadAction, sliceName]
  );

  const { run: complete } = useStoreLoadCompletedActionDispatch(sliceName);

  const runInner = useCallback(
    async (payload: ArticleItemStoreLoadActionPayload, data: ArticleItemStoreLoadActionData) => {
      const {
        abortSignal,
        requestHandler,
        resourceOfApiResponse,
        resourceOfArticleItemStore
      } = data;

      if (abortSignal?.aborted) {
        return;
      }

      dispatch(createArticleItemStoreLoadAction(payload));

      const { actionResult } = payload;

      const response = actionResult
        ? await requestHandler.handle(
            createArticleDomainItemGetOperationRequest(
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
    [complete, dispatch]
  );

  const aborted = abortController?.signal.aborted;

  useEffect(
    () => {
      if (aborted) {
        return;
      }

      const abortControllerInner = new AbortController();

      const dataOfLoadActionInner: ArticleItemStoreLoadActionData = {
        ...dataOfLoadAction,
        abortSignal: abortControllerInner.signal,
      };

      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        runInner(payloadOfLoadAction, dataOfLoadActionInner);
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          runInner(payloadOfLoadAction, dataOfLoadActionInner);
        } else {
          abortControllerInner.abort();
        }
      };
    },
    [aborted, dataOfLoadAction, dispatchType, payloadOfLoadAction, runInner]
  );

  return useMemo<ArticleItemStoreLoadActionDispatch>(
    () => ({
      run: async (actionResult: ArticleItemStoreLoadActionResult, abortSignal?: AbortSignal) => {
        const dataOfLoadActionInner = createArticleItemStoreLoadActionData({
          ...dataOfLoadAction,
          abortSignal,
        });

        const payloadOfLoadActionInner = createArticleItemStoreLoadActionPayload({
          ...payloadOfLoadAction,
          actionResult
        });

        await runInner(payloadOfLoadActionInner, dataOfLoadActionInner);
      }
    }),
    [dataOfLoadAction, payloadOfLoadAction, runInner]
  );
}
