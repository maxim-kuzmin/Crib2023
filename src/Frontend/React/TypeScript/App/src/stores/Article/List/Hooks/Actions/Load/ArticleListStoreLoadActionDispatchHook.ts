import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { StoreDispatchType } from '../../../../../../common';
import { createArticleDomainListGetOperationRequest } from '../../../../../../domains';
import {
  type ArticleListStoreLoadActionDispatch,
  type ArticleListStoreLoadActionOptions,
  type ArticleListStoreLoadActionPayload,
  type ArticleListStoreLoadActionResult,
  type ArticleListStoreSliceName,
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

  const payloadOfLoadAction = useMemo(
    () => createArticleListStoreLoadActionPayload({
      actionResult: resultOfLoadAction,
      resourceOfApiResponse,
      resourceOfArticleListStore,
      requestHandler,
      sliceName,
    }),
    [resultOfLoadAction, requestHandler, resourceOfApiResponse, resourceOfArticleListStore, sliceName]
  );

  const { run: complete } = hooks.Features.Article.List.Store.useStoreLoadCompletedActionDispatch(
    sliceName,
    { callback }
  );

  const run = useCallback(
    async (payload: ArticleListStoreLoadActionPayload) => {
      const {
        abortSignal,
        actionResult,
        requestHandler,
        resourceOfApiResponse,
        resourceOfArticleListStore
      } = payload;

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

  useEffect(
    () => {
      if (abortController?.signal.aborted) {
        return;
      }

      const abortControllerInner = new AbortController();

      const payloadOfLoadActionInner = createArticleListStoreLoadActionPayload({
        ...payloadOfLoadAction,
        abortSignal: abortControllerInner.signal,
      });

      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        run(payloadOfLoadActionInner);
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          run(payloadOfLoadActionInner);
        } else {
          abortControllerInner.abort();
        }
      };
    },
    [abortController, dispatchType, payloadOfLoadAction, run]
  );

  return useMemo<ArticleListStoreLoadActionDispatch>(
    () => ({
      run: async (actionResult: ArticleListStoreLoadActionResult, abortSignal?: AbortSignal) => {
        const payloadOfLoadActionInner = createArticleListStoreLoadActionPayload({
          ...payloadOfLoadAction,
          abortSignal,
          actionResult
        });

        await run(payloadOfLoadActionInner);
      }
    }),
    [payloadOfLoadAction, run]
  );
}
