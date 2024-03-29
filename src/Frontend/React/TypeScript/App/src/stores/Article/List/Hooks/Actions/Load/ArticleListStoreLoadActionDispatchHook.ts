import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { type StoreActionOptions, StoreDispatchType } from '../../../../../../common';
import { type ApiOperationResponse } from '../../../../../../data';
import {
  createArticleDomainListGetOperationRequest,
  createArticleDomainListGetOperationResponse,
} from '../../../../../../domains';
import {
  type ArticleListStoreLoadActionData,
  type ArticleListStoreLoadActionDispatch,
  type ArticleListStoreLoadActionPayload,
  type ArticleListStoreLoadActionResult,
  type ArticleListStoreLoadCompletedActionResult,
  type ArticleListStoreSliceName,
  createArticleListStoreLoadActionData,
  createArticleListStoreLoadActionPayload,
} from '../../../../../../features';
import { createArticleListStoreLoadAction } from '../../../Actions';
import { useArticleListStoreDispatch } from '../../../ArticleListStoreHooks';
import {
  useStoreLoadCompletedActionDispatch
} from '../LoadCompleted/ArticleListStoreLoadCompletedActionDispatchHook';

interface Options extends StoreActionOptions {
  readonly resultOfLoadAction?: ArticleListStoreLoadActionResult;
}

export function useStoreLoadActionDispatch (
  sliceName: ArticleListStoreSliceName,
  {
    dispatchType,
    abortController,
    resultOfLoadAction
  }: Options = {}
): ArticleListStoreLoadActionDispatch {
  const dispatch = useArticleListStoreDispatch();

  const { hooks } = useAppInstance();

  const resourceOfApiResponse = hooks.Data.Api.Response.useResource();
  const resourceOfArticleListStore = hooks.Features.Article.List.Store.useResource();
  const requestHandler = useRef(hooks.Domains.Article.useListGetOperationRequestHandler()).current;

  const dataOfLoadAction = useMemo(
    () => createArticleListStoreLoadActionData({
      resourceOfApiResponse,
      resourceOfArticleListStore,
      requestHandler,
    }),
    [requestHandler, resourceOfApiResponse, resourceOfArticleListStore]
  );

  const payloadOfLoadAction = useMemo(
    () => createArticleListStoreLoadActionPayload({
      actionResult: resultOfLoadAction,
      sliceName,
    }),
    [resultOfLoadAction, sliceName]
  );

  const { run: complete } = useStoreLoadCompletedActionDispatch(sliceName);

  const runInner = useCallback(
    async (payload: ArticleListStoreLoadActionPayload, data: ArticleListStoreLoadActionData) => {
      const {
        abortSignal,
        requestHandler,
        resourceOfApiResponse,
        resourceOfArticleListStore
      } = data;

      if (abortSignal?.aborted) {
        return;
      }

      dispatch(createArticleListStoreLoadAction(payload));

      const { actionResult } = payload;

      let response: ArticleListStoreLoadCompletedActionResult = null;

      try {
        response = actionResult
          ? await requestHandler.handle(
            createArticleDomainListGetOperationRequest(
                actionResult,
                {
                  operationName: resourceOfArticleListStore.getOperationNameForGet(),
                  resourceOfApiResponse
                }
              ),
              abortSignal
            )
          : null;
      } catch (error: unknown) {
        const errorResponse = error as ApiOperationResponse;

        if (errorResponse) {
          response = createArticleDomainListGetOperationResponse(errorResponse);
        }
      }

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

      const dataOfLoadActionInner: ArticleListStoreLoadActionData = {
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

  return useMemo<ArticleListStoreLoadActionDispatch>(
    () => ({
      run: async (actionResult: ArticleListStoreLoadActionResult, abortSignal?: AbortSignal) => {
        const dataOfLoadActionInner = createArticleListStoreLoadActionData({
          ...dataOfLoadAction,
          abortSignal,
        });

        const payloadOfLoadActionInner = createArticleListStoreLoadActionPayload({
          ...payloadOfLoadAction,
          actionResult
        });

        await runInner(payloadOfLoadActionInner, dataOfLoadActionInner);
      }
    }),
    [dataOfLoadAction, payloadOfLoadAction, runInner]
  );
}
