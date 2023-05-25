import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleItemStoreSliceName,
  type ArticleItemStoreDeleteCompletedActionDispatch,
  type ArticleItemStoreDeleteCompletedActionOptions,
  type ArticleItemStoreDeleteCompletedActionPayload,
  type ArticleItemStoreDeleteCompletedActionResult,
  createArticleItemStoreDeleteCompletedActionPayload,
} from '../../../../../../features';
import { ArticleItemStoreActionType } from '../../../ArticleItemStoreActionType';
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
    }),
    [resultOfDeleteCompletedAction]
  );

  const run = useCallback(
    (payload: ArticleItemStoreDeleteCompletedActionPayload) => {
      dispatch({
        payload,
        sliceName,
        type: ArticleItemStoreActionType.DeleteCompleted
      });

      if (callback) {
        callback(payload.actionResult);
      }
    },
    [callback, dispatch, sliceName]
  );

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        run(payloadOfDeleteCompletedAction);
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          run(payloadOfDeleteCompletedAction);
        }
      };
    },
    [dispatchType, payloadOfDeleteCompletedAction, run]
  );

  return useMemo<ArticleItemStoreDeleteCompletedActionDispatch>(
    () => ({
      run: (actionResult: ArticleItemStoreDeleteCompletedActionResult) => {
        const payloadOfDeleteCompletedActionInner = createArticleItemStoreDeleteCompletedActionPayload({
          ...payloadOfDeleteCompletedAction,
          actionResult
        });

        run(payloadOfDeleteCompletedActionInner);
      }
    }),
    [payloadOfDeleteCompletedAction, run]
  );
}
