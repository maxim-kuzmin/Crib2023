import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleItemStoreClearActionDispatch,
  type ArticleItemStoreClearActionOptions,
  type ArticleItemStoreSliceName,
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

  const runInner = useCallback(
    () => {
      dispatch(createArticleItemStoreClearAction(payloadOfClearAction));

      if (callback) {
        callback();
      }
    },
    [callback, dispatch, payloadOfClearAction]
  );

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        runInner();
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          runInner();
        }
      };
    },
    [dispatchType, runInner]
  );

  return useMemo<ArticleItemStoreClearActionDispatch>(
    () => ({ run: runInner }),
    [runInner]
  );
}
