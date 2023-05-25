import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleItemStoreSliceName,
  type ArticleItemStoreLoadCompletedActionDispatch,
  type ArticleItemStoreLoadCompletedActionOptions,
  type ArticleItemStoreLoadCompletedActionPayload,
  type ArticleItemStoreLoadCompletedActionResult,
  createArticleItemStoreLoadCompletedActionPayload,
} from '../../../../../../features';
import { ArticleItemStoreActionType } from '../../../ArticleItemStoreActionType';
import { useArticleItemStoreDispatch } from '../../../ArticleItemStoreHooks';

export function useStoreLoadCompletedActionDispatch (
  sliceName: ArticleItemStoreSliceName,
  {
    callback,
    dispatchType,
    resultOfLoadCompletedAction
  }: ArticleItemStoreLoadCompletedActionOptions = {}
): ArticleItemStoreLoadCompletedActionDispatch {
  const dispatch = useArticleItemStoreDispatch();

  const payloadOfLoadCompletedAction = useMemo(
    () => createArticleItemStoreLoadCompletedActionPayload({
      actionResult: resultOfLoadCompletedAction,
    }),
    [resultOfLoadCompletedAction]
  );

  const run = useCallback(
    (payload: ArticleItemStoreLoadCompletedActionPayload) => {
      dispatch({
        payload,
        sliceName,
        type: ArticleItemStoreActionType.LoadCompleted
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
        run(payloadOfLoadCompletedAction);
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          run(payloadOfLoadCompletedAction);
        }
      };
    },
    [dispatchType, payloadOfLoadCompletedAction, run]
  );

  return useMemo<ArticleItemStoreLoadCompletedActionDispatch>(
    () => ({
      run: (actionResult: ArticleItemStoreLoadCompletedActionResult) => {
        const payloadOfLoadCompletedActionInner = createArticleItemStoreLoadCompletedActionPayload({
          ...payloadOfLoadCompletedAction,
          actionResult
        });

        run(payloadOfLoadCompletedActionInner);
      }
    }),
    [payloadOfLoadCompletedAction, run]
  );
}
