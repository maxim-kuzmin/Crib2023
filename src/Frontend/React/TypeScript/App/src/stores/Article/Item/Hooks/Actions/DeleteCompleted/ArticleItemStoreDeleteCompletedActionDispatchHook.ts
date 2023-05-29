import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleItemStoreDeleteCompletedActionDispatch,
  type ArticleItemStoreDeleteCompletedActionOptions,
  type ArticleItemStoreDeleteCompletedActionPayload,
  type ArticleItemStoreDeleteCompletedActionResult,
  type ArticleItemStoreSliceName,
  createArticleItemStoreDeleteCompletedActionPayload,
} from '../../../../../../features';
import { createArticleItemStoreDeleteCompletedAction } from '../../../Actions';
import { useArticleItemStoreDispatch } from '../../../ArticleItemStoreHooks';

export function useStoreDeleteCompletedActionDispatch (
  sliceName: ArticleItemStoreSliceName,
  {
    callback,
    dispatchType,
    resultOfDeleteCompletedAction
  }: ArticleItemStoreDeleteCompletedActionOptions = {}
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
