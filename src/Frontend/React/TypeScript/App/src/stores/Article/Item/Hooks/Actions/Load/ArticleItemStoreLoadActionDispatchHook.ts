import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { StoreDispatchType } from '../../../../../../common';
import { createArticleDomainItemGetOperationRequest } from '../../../../../../domains';
import {
  type ArticleItemStoreLoadActionDispatch,
  type ArticleItemStoreLoadActionOptions,
  type ArticleItemStoreLoadActionPayload,
  type ArticleItemStoreSliceName,
} from '../../../../../../features';
import { ArticleItemStoreActionType } from '../../../ArticleItemStoreActionType';
import { useArticleItemStoreDispatch } from '../../../ArticleItemStoreHooks';

export function useStoreLoadActionDispatch (
  sliceName: ArticleItemStoreSliceName,
  {
    callback,
    dispatchType,
    abortController,
    payloadOfLoadAction
  }: ArticleItemStoreLoadActionOptions = {}
): ArticleItemStoreLoadActionDispatch {
  const dispatch = useArticleItemStoreDispatch();

  const { hooks } = useAppInstance();

  const resourceOfApiResponse = hooks.Data.Api.Response.useResource();
  const resourceOfArticleItemStore = hooks.Features.Article.Item.Store.useResource();
  const requestHandler = useRef(hooks.Domains.Article.useItemGetOperationRequestHandler()).current;

  const { run: complete } = hooks.Features.Article.Item.Store.useStoreLoadCompletedActionDispatch(
    sliceName,
    { callback }
  );

  const run = useCallback(
    async (payload: ArticleItemStoreLoadActionPayload, abortSignal?: AbortSignal) => {
      if (abortSignal?.aborted) {
        return;
      }

      dispatch({ payload, sliceName, type: ArticleItemStoreActionType.Load });

      const response = payload
        ? await requestHandler.handle(
            createArticleDomainItemGetOperationRequest(
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
      if (abortController?.signal.aborted) {
        return;
      }

      const abortControllerInner = new AbortController();

      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfLoadAction) {
        run(payloadOfLoadAction, abortControllerInner.signal);
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfLoadAction) {
          run(payloadOfLoadAction, abortControllerInner.signal);
        } else {
          abortControllerInner.abort();
        }
      };
    },
    [abortController, dispatchType, payloadOfLoadAction, run]
  );

  return useMemo<ArticleItemStoreLoadActionDispatch>(() => ({ run }), [run]);
}
