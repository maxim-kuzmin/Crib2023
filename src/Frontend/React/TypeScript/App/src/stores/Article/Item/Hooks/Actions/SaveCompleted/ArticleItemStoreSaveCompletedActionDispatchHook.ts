import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleItemStoreSliceName,
  type ArticleItemStoreSaveCompletedActionDispatch,
  type ArticleItemStoreSaveCompletedActionOptions,
  type ArticleItemStoreSaveCompletedActionPayload,
} from '../../../../../../features';
import { ArticleItemStoreActionType } from '../../../ArticleItemStoreActionType';
import { useArticleItemStoreDispatch } from '../../../ArticleItemStoreHooks';

export function useStoreSaveCompletedActionDispatch (
  sliceName: ArticleItemStoreSliceName,
  {
    callback,
    dispatchType,
    payloadOfSaveCompletedAction
  }: ArticleItemStoreSaveCompletedActionOptions = {}
): ArticleItemStoreSaveCompletedActionDispatch {
  const dispatch = useArticleItemStoreDispatch();

  const run = useCallback(
    (payload: ArticleItemStoreSaveCompletedActionPayload) => {
      dispatch({
        payload,
        sliceName,
        type: ArticleItemStoreActionType.SaveCompleted
      });

      if (callback) {
        callback(payload);
      }
    },
    [callback, dispatch, sliceName]
  );

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfSaveCompletedAction) {
        run(payloadOfSaveCompletedAction);
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfSaveCompletedAction) {
          run(payloadOfSaveCompletedAction);
        }
      };
    },
    [dispatchType, payloadOfSaveCompletedAction, run]
  );

  return useMemo<ArticleItemStoreSaveCompletedActionDispatch>(() => ({ run }), [run]);
}
