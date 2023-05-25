import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleItemStoreSliceName,
  type ArticleItemStoreSetActionDispatch,
  type ArticleItemStoreSetActionOptions,
  type ArticleItemStoreSetActionPayload,
  type ArticleItemStoreSetActionResult,
  createArticleItemStoreSetActionPayload,
} from '../../../../../../features';
import { ArticleItemStoreActionType } from '../../../ArticleItemStoreActionType';
import { useArticleItemStoreDispatch } from '../../../ArticleItemStoreHooks';

export function useStoreSetActionDispatch (
  sliceName: ArticleItemStoreSliceName,
  {
    callback,
    dispatchType,
    resultOfSetAction
  }: ArticleItemStoreSetActionOptions = {}
): ArticleItemStoreSetActionDispatch {
  const dispatch = useArticleItemStoreDispatch();

  const payloadOfSetAction = useMemo(
    () => createArticleItemStoreSetActionPayload({ actionResult: resultOfSetAction }),
    [resultOfSetAction]
  );

  const run = useCallback(
    (payload: ArticleItemStoreSetActionPayload) => {
      dispatch({ payload, sliceName, type: ArticleItemStoreActionType.Set });

      if (callback) {
        callback(payload.actionResult);
      }
    },
    [callback, dispatch, sliceName]
  );

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        run(payloadOfSetAction);
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          run(payloadOfSetAction);
        }
      };
    },
    [dispatchType, payloadOfSetAction, run]
  );

  return useMemo<ArticleItemStoreSetActionDispatch>(
    () => ({
      run: (actionResult: ArticleItemStoreSetActionResult) => {
        const payloadOfSetActionInner = createArticleItemStoreSetActionPayload({
          ...payloadOfSetAction,
          actionResult
        });

        run(payloadOfSetActionInner);
      }
    }),
    [payloadOfSetAction, run]
  );
}
