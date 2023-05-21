import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { StoreDispatchType } from '../../../../../../common';
import { createArticleDomainListGetOperationRequest } from '../../../../../../domains';
import {
  type ArticleListStoreLoadActionDispatch,
  type ArticleListStoreLoadActionOptions,
  type ArticleListStoreLoadActionPayload,
  type ArticleListStoreSliceName,
} from '../../../../../../features';
import { ArticleListStoreActionType } from '../../../ArticleListStoreActionType';
import { useArticleListStoreDispatch } from '../../../ArticleListStoreHooks';

export function useStoreLoadActionDispatch (
  sliceName: ArticleListStoreSliceName,
  {
    callback,
    dispatchType,
    abortController,
    payloadOfLoadAction
  }: ArticleListStoreLoadActionOptions = {}
): ArticleListStoreLoadActionDispatch {
  const dispatch = useArticleListStoreDispatch();

  const { hooks } = useAppInstance();

  const resourceOfApiResponse = hooks.Data.Api.Response.useResource();
  const resourceOfArticleListStore = hooks.Features.Article.List.Store.useResource();
  const requestHandler = useRef(hooks.Domains.Article.useListGetOperationRequestHandler()).current;

  const { run: complete } = hooks.Features.Article.List.Store.useStoreLoadCompletedActionDispatch(
    sliceName,
    { callback }
  );

  const run = useCallback(
    async (
      payload: ArticleListStoreLoadActionPayload,
      abortController?: AbortController
    ) => {
      if (abortController?.signal.aborted) {
        return;
      }

      dispatch({ payload, sliceName, type: ArticleListStoreActionType.Load });

      const response = payload
        ? await requestHandler.handle(
            createArticleDomainListGetOperationRequest(
              payload,
              {
                operationName: resourceOfArticleListStore.getOperationNameForGet(),
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
    [complete, dispatch, requestHandler, resourceOfApiResponse, resourceOfArticleListStore, sliceName]
  );

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfLoadAction) {
        run(payloadOfLoadAction, abortController);
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfLoadAction) {
          run(payloadOfLoadAction, abortController);
        } else {
          abortController?.abort();
        }
      };
    },
    [abortController, dispatchType, payloadOfLoadAction, run]
  );

  return useMemo<ArticleListStoreLoadActionDispatch>(() => ({ run }), [run]);
}
