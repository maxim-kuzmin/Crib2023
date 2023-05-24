import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { StoreDispatchType } from '../../../../../../common';
import { createArticleDomainItemSaveOperationRequest } from '../../../../../../domains';
import {
  type ArticleItemStoreSaveActionDispatch,
  type ArticleItemStoreSaveActionOptions,
  type ArticleItemStoreSaveActionPayload,
  type ArticleItemStoreSliceName,
} from '../../../../../../features';
import { ArticleItemStoreActionType } from '../../../ArticleItemStoreActionType';
import { useArticleItemStoreDispatch } from '../../../ArticleItemStoreHooks';

export function useStoreSaveActionDispatch (
  sliceName: ArticleItemStoreSliceName,
  {
    callback,
    dispatchType,
    abortController,
    payloadOfSaveAction
  }: ArticleItemStoreSaveActionOptions = {}
): ArticleItemStoreSaveActionDispatch {
  const dispatch = useArticleItemStoreDispatch();

  const { hooks } = useAppInstance();

  const resourceOfApiResponse = hooks.Data.Api.Response.useResource();
  const resourceOfArticleItemStore = hooks.Features.Article.Item.Store.useResource();
  const requestHandler = useRef(hooks.Domains.Article.useItemSaveOperationRequestHandler()).current;

  const { run: complete } = hooks.Features.Article.Item.Store.useStoreSaveCompletedActionDispatch(
    sliceName,
    { callback }
  );

  const run = useCallback(
    async (payload: ArticleItemStoreSaveActionPayload, abortSignal?: AbortSignal) => {
      if (abortSignal?.aborted) {
        return;
      }

      dispatch({ payload, sliceName, type: ArticleItemStoreActionType.Save });

      const response = payload
        ? await requestHandler.handle(
            createArticleDomainItemSaveOperationRequest(
              payload,
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
    [complete, dispatch, requestHandler, resourceOfApiResponse, resourceOfArticleItemStore, sliceName]
  );

  useEffect(
    () => {
      const abortControllerInner = abortController ?? new AbortController();

      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfSaveAction) {
        run(payloadOfSaveAction, abortControllerInner.signal);
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfSaveAction) {
          run(payloadOfSaveAction, abortControllerInner.signal);
        } else {
          abortControllerInner.abort();
        }
      };
    },
    [abortController, dispatchType, payloadOfSaveAction, run]
  );

  return useMemo<ArticleItemStoreSaveActionDispatch>(() => ({ run }), [run]);
}
