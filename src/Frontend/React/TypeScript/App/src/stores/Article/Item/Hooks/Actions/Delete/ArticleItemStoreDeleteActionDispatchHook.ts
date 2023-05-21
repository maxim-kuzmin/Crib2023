import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { StoreDispatchType } from '../../../../../../common';
import { createArticleDomainItemDeleteOperationRequest } from '../../../../../../domains';
import {
  type ArticleItemStoreDeleteActionDispatch,
  type ArticleItemStoreDeleteActionOptions,
  type ArticleItemStoreDeleteActionPayload,
  type ArticleItemStoreSliceName,
} from '../../../../../../features';
import { ArticleItemStoreActionType } from '../../../ArticleItemStoreActionType';
import { useArticleItemStoreDispatch } from '../../../ArticleItemStoreHooks';

export function useStoreDeleteActionDispatch (
  sliceName: ArticleItemStoreSliceName,
  {
    callback,
    dispatchType,
    abortController,
    payloadOfDeleteAction
  }: ArticleItemStoreDeleteActionOptions = {}
): ArticleItemStoreDeleteActionDispatch {
  const dispatch = useArticleItemStoreDispatch();

  const { hooks } = useAppInstance();

  const resourceOfApiResponse = hooks.Data.Api.Response.useResource();
  const resourceOfArticleItemStore = hooks.Features.Article.Item.Store.useResource();
  const requestHandler = useRef(hooks.Domains.Article.useItemDeleteOperationRequestHandler()).current;

  const { run: complete } = hooks.Features.Article.Item.Store.useStoreDeleteCompletedActionDispatch(
    sliceName,
    { callback }
  );

  const run = useCallback(
    async (
      payload: ArticleItemStoreDeleteActionPayload,
      abortController?: AbortController
    ) => {
      if (abortController?.signal.aborted) {
        return;
      }

      dispatch({ payload, sliceName, type: ArticleItemStoreActionType.Delete });

      const response = payload
        ? await requestHandler.handle(
            createArticleDomainItemDeleteOperationRequest(
              payload,
              {
                operationName: resourceOfArticleItemStore.getOperationNameForDelete(),
                resourceOfApiResponse
              }
            ),
            abortController
          )
        : null;

      if (abortController?.signal.aborted) {
        return;
      }

      complete(response);
    },
    [complete, dispatch, requestHandler, resourceOfApiResponse, resourceOfArticleItemStore, sliceName]
  );

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfDeleteAction) {
        run(payloadOfDeleteAction, abortController);
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfDeleteAction) {
          run(payloadOfDeleteAction, abortController);
        } else {
          abortController?.abort();
        }
      };
    },
    [abortController, dispatchType, payloadOfDeleteAction, run]
  );

  return useMemo<ArticleItemStoreDeleteActionDispatch>(() => ({ run }), [run]);
}
