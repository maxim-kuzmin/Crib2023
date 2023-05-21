import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleItemStoreSliceName,
  type ArticleItemStoreLoadCompletedActionDispatch,
  type ArticleItemStoreLoadCompletedActionOptions,
  type ArticleItemStoreLoadCompletedActionPayload,
} from '../../../../../../features';
import { ArticleItemStoreActionType } from '../../../ArticleItemStoreActionType';
import { useArticleItemStoreDispatch } from '../../../ArticleItemStoreHooks';

export function useStoreLoadCompletedActionDispatch (
  sliceName: ArticleItemStoreSliceName,
  {
    callback,
    dispatchType,
    payloadOfLoadCompletedAction
  }: ArticleItemStoreLoadCompletedActionOptions = {}
): ArticleItemStoreLoadCompletedActionDispatch {
  const dispatch = useArticleItemStoreDispatch();

  const run = useCallback(
    (payload: ArticleItemStoreLoadCompletedActionPayload) => {
      dispatch({
        payload,
        sliceName,
        type: ArticleItemStoreActionType.LoadCompleted
      });

      if (callback) {
        callback(payload);
      }
    },
    [callback, dispatch, sliceName]
  );

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfLoadCompletedAction) {
        run(payloadOfLoadCompletedAction);
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfLoadCompletedAction) {
          run(payloadOfLoadCompletedAction);
        }
      };
    },
    [dispatchType, payloadOfLoadCompletedAction, run]
  );

  return useMemo<ArticleItemStoreLoadCompletedActionDispatch>(() => ({ run }), [run]);
}
