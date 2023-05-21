import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleListStoreSliceName,
  type ArticleListStoreClearActionDispatch,
  type ArticleListStoreClearActionOptions,
} from '../../../../../../features';
import { ArticleListStoreActionType } from '../../../ArticleListStoreActionType';
import { useArticleListStoreDispatch } from '../../../ArticleListStoreHooks';

export function useStoreClearActionDispatch (
  sliceName: ArticleListStoreSliceName,
  {
    callback,
    dispatchType
  }: ArticleListStoreClearActionOptions = {}
): ArticleListStoreClearActionDispatch {
  const dispatch = useArticleListStoreDispatch();

  const run = useCallback(
    () => {
      dispatch({ sliceName, type: ArticleListStoreActionType.Clear });

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

  return useMemo<ArticleListStoreClearActionDispatch>(() => ({ run }), [run]);
}
