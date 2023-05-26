import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleItemStoreSliceName,
  type ArticleItemStoreClearActionDispatch,
  type ArticleItemStoreClearActionOptions,
  createArticleItemStoreClearActionPayload,
} from '../../../../../../features';
import { createArticleItemStoreClearAction } from '../../../Actions';
import { useArticleItemStoreDispatch } from '../../../ArticleItemStoreHooks';

export function useStoreClearActionDispatch (
  sliceName: ArticleItemStoreSliceName,
  {
    callback,
    dispatchType
  }: ArticleItemStoreClearActionOptions = {}
): ArticleItemStoreClearActionDispatch {
  const dispatch = useArticleItemStoreDispatch();

  const payloadOfClearAction = useMemo(
    () => createArticleItemStoreClearActionPayload({ sliceName }),
    [sliceName]
  );

  const run = useCallback(
    () => {
      dispatch(createArticleItemStoreClearAction({ payload: payloadOfClearAction }));

      if (callback) {
        callback();
      }
    },
    [callback, dispatch, payloadOfClearAction]
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
