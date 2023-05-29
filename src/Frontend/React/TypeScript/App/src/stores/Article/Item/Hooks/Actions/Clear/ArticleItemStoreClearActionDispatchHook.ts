import { useCallback, useEffect, useMemo } from 'react';
import { type StoreActionOptions, StoreDispatchType } from '../../../../../../common';
import {
  type ArticleItemStoreClearActionCallback,
  type ArticleItemStoreClearActionDispatch,
  type ArticleItemStoreSliceName,
  createArticleItemStoreClearActionPayload,
} from '../../../../../../features';
import { createArticleItemStoreClearAction } from '../../../Actions';
import { useArticleItemStoreDispatch } from '../../../ArticleItemStoreHooks';

interface Options extends StoreActionOptions {
  readonly callback?: ArticleItemStoreClearActionCallback;
}

export function useStoreClearActionDispatch (
  sliceName: ArticleItemStoreSliceName,
  {
    callback,
    dispatchType
  }: Options = {}
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
