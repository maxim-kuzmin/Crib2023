import { useCallback, useEffect, useMemo } from 'react';
import { type StoreActionOptions, StoreDispatchType } from '../../../../../../common';
import {
  type ArticleListStoreClearActionCallback,
  type ArticleListStoreClearActionDispatch,
  type ArticleListStoreSliceName,
  createArticleListStoreClearActionPayload,
} from '../../../../../../features';
import { createArticleListStoreClearAction } from '../../../Actions';
import { useArticleListStoreDispatch } from '../../../ArticleListStoreHooks';

interface Options extends StoreActionOptions {
  readonly callback?: ArticleListStoreClearActionCallback;
}

export function useStoreClearActionDispatch (
  sliceName: ArticleListStoreSliceName,
  {
    callback,
    dispatchType
  }: Options = {}
): ArticleListStoreClearActionDispatch {
  const dispatch = useArticleListStoreDispatch();

  const payloadOfClearAction = useMemo(
    () => createArticleListStoreClearActionPayload({ sliceName }),
    [sliceName]
  );

  const runInner = useCallback(
    () => {
      dispatch(createArticleListStoreClearAction(payloadOfClearAction));

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

  return useMemo<ArticleListStoreClearActionDispatch>(
    () => ({ run: runInner }),
    [runInner]
  );
}
