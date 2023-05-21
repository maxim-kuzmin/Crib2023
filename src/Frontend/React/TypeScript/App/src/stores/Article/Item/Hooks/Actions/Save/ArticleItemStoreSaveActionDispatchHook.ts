import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { type ShouldBeCanceled, StoreDispatchType, shouldNotBeCanceled } from '../../../../../../common';
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
    isCanceled,
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
    async (
      payload: ArticleItemStoreSaveActionPayload,
      shouldBeCanceled: ShouldBeCanceled = shouldNotBeCanceled
    ) => {
      if (shouldBeCanceled()) {
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

      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfSaveAction) {
        run(payloadOfSaveAction, shouldBeCanceledInner);
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfSaveAction) {
          run(payloadOfSaveAction, shouldBeCanceledInner);
        } else {
          isCanceledInner = true;
        }
      };
    },
    [dispatchType, isCanceled, payloadOfSaveAction, run]
  );

  return useMemo<ArticleItemStoreSaveActionDispatch>(() => ({ run }), [run]);
}
