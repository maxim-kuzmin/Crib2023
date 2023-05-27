import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { StoreDispatchType } from '../../../../../../common';
import { createArticleDomainListGetOperationRequest } from '../../../../../../domains';
import {
  type ArticleListStoreLoadActionData,
  type ArticleListStoreLoadActionDispatch,
  type ArticleListStoreLoadActionOptions,
  type ArticleListStoreLoadActionPayload,
  type ArticleListStoreLoadActionResult,
  type ArticleListStoreSliceName,
  createArticleListStoreLoadActionData,
  createArticleListStoreLoadActionPayload,
} from '../../../../../../features';
import { createArticleListStoreLoadAction } from '../../../Actions';
import { useArticleListStoreDispatch } from '../../../ArticleListStoreHooks';

export function useStoreLoadActionDispatch (
  sliceName: ArticleListStoreSliceName,
  {
    callback,
    dispatchType,
    abortController,
    resultOfLoadAction
  }: ArticleListStoreLoadActionOptions = {}
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

  const { run: complete } = hooks.Features.Article.List.Store.useStoreLoadCompletedActionDispatch(
    sliceName,
    { callback }
  );

  const run = useCallback(
    async (
      payload: ArticleListStoreLoadActionPayload,
      dataOfLoadAction: ArticleListStoreLoadActionData
    ) => {
      const {
        abortSignal,
        requestHandler,
        resourceOfApiResponse,
        resourceOfArticleListStore
      } = dataOfLoadAction;

      const { actionResult } = payload;

      if (abortSignal?.aborted) {
        return;
      }

      dispatch(createArticleListStoreLoadAction(payload));

      const response = actionResult
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
        run(payloadOfLoadAction, dataOfLoadActionInner);
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          run(payloadOfLoadAction, dataOfLoadActionInner);
        } else {
          abortControllerInner.abort();
        }
      };
    },
    [aborted, dataOfLoadAction, dispatchType, payloadOfLoadAction, run]
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

        await run(payloadOfLoadActionInner, dataOfLoadActionInner);
      }
    }),
    [dataOfLoadAction, payloadOfLoadAction, run]
  );
}
