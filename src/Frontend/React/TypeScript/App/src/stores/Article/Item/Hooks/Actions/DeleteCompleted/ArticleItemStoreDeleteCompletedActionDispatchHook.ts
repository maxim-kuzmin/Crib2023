import { useCallback, useEffect, useMemo } from 'react';
import { type StoreActionOptions, StoreDispatchType } from '../../../../../../common';
import {
  type ArticleItemStoreDeleteCompletedActionCallback,
  type ArticleItemStoreDeleteCompletedActionDispatch,
  type ArticleItemStoreDeleteCompletedActionPayload,
  type ArticleItemStoreDeleteCompletedActionResult,
  type ArticleItemStoreSliceName,
  createArticleItemStoreDeleteCompletedActionPayload,
} from '../../../../../../features';
import { createArticleItemStoreDeleteCompletedAction } from '../../../Actions';
import { useArticleItemStoreDispatch } from '../../../ArticleItemStoreHooks';

interface Options extends StoreActionOptions {
  readonly callback?: ArticleItemStoreDeleteCompletedActionCallback;
  readonly resultOfDeleteCompletedAction?: ArticleItemStoreDeleteCompletedActionResult;
}

export function useStoreDeleteCompletedActionDispatch (
  sliceName: ArticleItemStoreSliceName,
  {
    callback,
    dispatchType,
    resultOfDeleteCompletedAction
  }: Options = {}
): ArticleItemStoreDeleteCompletedActionDispatch {
  const dispatch = useArticleItemStoreDispatch();

  const payloadOfDeleteCompletedAction = useMemo(
    () => createArticleItemStoreDeleteCompletedActionPayload({
      actionResult: resultOfDeleteCompletedAction,
      sliceName,
    }),
    [resultOfDeleteCompletedAction, sliceName]
  );

  const runInner = useCallback(
    (payload: ArticleItemStoreDeleteCompletedActionPayload) => {
      dispatch(createArticleItemStoreDeleteCompletedAction(payload));

      const { actionResult } = payload;

      if (callback && !actionResult?.error) {
        callback(actionResult);
      }
    },
    [callback, dispatch]
  );

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        runInner(payloadOfDeleteCompletedAction);
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          runInner(payloadOfDeleteCompletedAction);
        }
      };
    },
    [dispatchType, payloadOfDeleteCompletedAction, runInner]
  );

  return useMemo<ArticleItemStoreDeleteCompletedActionDispatch>(
    () => ({
      run: (actionResult: ArticleItemStoreDeleteCompletedActionResult) => {
        const payloadOfDeleteCompletedActionInner = createArticleItemStoreDeleteCompletedActionPayload({
          ...payloadOfDeleteCompletedAction,
          actionResult
        });

        runInner(payloadOfDeleteCompletedActionInner);
      }
    }),
    [payloadOfDeleteCompletedAction, runInner]
  );
}
