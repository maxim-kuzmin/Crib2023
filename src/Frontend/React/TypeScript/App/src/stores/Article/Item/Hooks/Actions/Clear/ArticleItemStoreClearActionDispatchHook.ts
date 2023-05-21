import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleItemStoreSliceName,
  type ArticleItemStoreClearActionDispatch,
  type ArticleItemStoreClearActionOptions,
} from '../../../../../../features';
import { ArticleItemStoreActionType } from '../../../ArticleItemStoreActionType';
import { useArticleItemStoreDispatch } from '../../../ArticleItemStoreHooks';

export function useStoreClearActionDispatch (
  sliceName: ArticleItemStoreSliceName,
  {
    callback,
    dispatchType
  }: ArticleItemStoreClearActionOptions = {}
): ArticleItemStoreClearActionDispatch {
  const dispatch = useArticleItemStoreDispatch();

  const run = useCallback(
    () => {
      dispatch({ sliceName, type: ArticleItemStoreActionType.Clear });

      if (callback) {
        callback();
      }
    },
    [callback, dispatch, sliceName]
  );

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        run();
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          run();
        }
      };
    },
    [dispatchType, run]
  );

  return useMemo<ArticleItemStoreClearActionDispatch>(() => ({ run }), [run]);
}
