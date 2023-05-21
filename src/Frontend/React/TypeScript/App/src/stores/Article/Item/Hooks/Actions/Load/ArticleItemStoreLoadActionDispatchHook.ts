import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { type ShouldBeCanceled, StoreDispatchType, shouldNotBeCanceled } from '../../../../../../common';
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
    isCanceled,
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
    async (
      payload: ArticleItemStoreLoadActionPayload,
      shouldBeCanceled: ShouldBeCanceled = shouldNotBeCanceled
    ) => {
      if (shouldBeCanceled()) {
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
            shouldBeCanceled
          )
        : null;

      if (shouldBeCanceled()) {
        return;
      }

      complete(response);
    },
    [complete, dispatch, requestHandler, resourceOfApiResponse, resourceOfArticleItemStore, sliceName]
  );

  useEffect(
    () => {
      let isCanceledInner = isCanceled ?? false;

      const shouldBeCanceledInner = () => isCanceledInner;

      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfLoadAction) {
        run(payloadOfLoadAction, shouldBeCanceledInner);
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfLoadAction) {
          run(payloadOfLoadAction, shouldBeCanceledInner);
        } else {
          isCanceledInner = true;
        }
      };
    },
    [dispatchType, isCanceled, payloadOfLoadAction, run]
  );

  return useMemo<ArticleItemStoreLoadActionDispatch>(() => ({ run }), [run]);
}
