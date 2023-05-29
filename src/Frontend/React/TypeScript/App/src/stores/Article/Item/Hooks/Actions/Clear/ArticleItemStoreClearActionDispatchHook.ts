import { useCallback, useEffect, useMemo } from 'react';
import { type StoreActionOptions, StoreDispatchType } from '../../../../../../common';
import {
  type ArticleItemStoreClearActionDispatch,
  type ArticleItemStoreSliceName,
  createArticleItemStoreClearActionPayload,
} from '../../../../../../features';
import { createArticleItemStoreClearAction } from '../../../Actions';
import { useArticleItemStoreDispatch } from '../../../ArticleItemStoreHooks';

export function useStoreClearActionDispatch (
  sliceName: ArticleItemStoreSliceName,
  {
    dispatchType
  }: StoreActionOptions = {}
): ArticleItemStoreClearActionDispatch {
  const dispatch = useArticleItemStoreDispatch();

  const payloadOfClearAction = useMemo(
    () => createArticleItemStoreClearActionPayload({ sliceName }),
    [sliceName]
  );

  const runInner = useCallback(
    () => {
      dispatch(createArticleItemStoreClearAction(payloadOfClearAction));
    },
    [dispatch, payloadOfClearAction]
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
