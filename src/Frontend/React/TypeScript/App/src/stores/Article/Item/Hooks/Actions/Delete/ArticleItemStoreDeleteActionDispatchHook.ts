import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { type ShouldBeCanceled, StoreDispatchType } from '../../../../../../common';
import { createArticleDomainItemDeleteOperationRequest } from '../../../../../../domains';
import {
  type ArticleItemStoreDeleteActionDispatch,
  type ArticleItemStoreDeleteActionOptions,
  type ArticleItemStoreDeleteActionPayload,
  type ArticleItemStoreSliceName,
} from '../../../../../../features';
import { ArticleItemStoreActionType } from '../../../ArticleItemStoreActionType';
import { useArticleItemStoreDispatch } from '../../../ArticleItemStoreHooks';
import { runDeleteCompletedAction } from '../DeleteCompleted/ArticleItemStoreDeleteCompletedActionDispatchHook';

export function useStoreDeleteActionDispatch (
  sliceName: ArticleItemStoreSliceName,
  {
    callback,
    dispatchType,
    isCanceled,
    payloadOfDeleteAction
  }: ArticleItemStoreDeleteActionOptions = {}
): ArticleItemStoreDeleteActionDispatch {
  const { hooks } = useAppInstance();

  const resourceOfApiResponse = hooks.Data.Api.Response.useResource();

  const resourceOfArticleItemStore = hooks.Features.Article.Item.Store.useResource();

  const dispatch = useArticleItemStoreDispatch();

  const requestHandler = useRef(hooks.Domains.Article.useItemDeleteOperationRequestHandler()).current;

  const run = useCallback(
    async (
      payload: ArticleItemStoreDeleteActionPayload,
      shouldBeCanceled: ShouldBeCanceled = () => false
    ) => {
      if (shouldBeCanceled()) {
        return;
      }

      dispatch({
        payload,
        sliceName,
        type: ArticleItemStoreActionType.Delete
      });

      const response = payload
        ? await requestHandler.handle(
            createArticleDomainItemDeleteOperationRequest(
              payload,
              {
                operationName: resourceOfArticleItemStore.getOperationNameForDelete(),
                resourceOfApiResponse
              }
            ),
            shouldBeCanceled
          )
        : null;

      if (shouldBeCanceled()) {
        return;
      }

      runDeleteCompletedAction({
        callback,
        dispatch,
        payload: response,
        sliceName
      });
    },
    [callback, dispatch, requestHandler, resourceOfApiResponse, resourceOfArticleItemStore, sliceName]
  );

  useEffect(
    () => {
      let isCanceledInner = isCanceled ?? false;

      const shouldBeCanceledInner = () => isCanceledInner;

      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfDeleteAction) {
        run(payloadOfDeleteAction, shouldBeCanceledInner);
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfDeleteAction) {
          run(payloadOfDeleteAction, shouldBeCanceledInner);
        } else {
          isCanceledInner = true;
        }
      };
    },
    [dispatchType, isCanceled, payloadOfDeleteAction, run]
  );

  return useMemo<ArticleItemStoreDeleteActionDispatch>(() => ({ run }), [run]);
}
