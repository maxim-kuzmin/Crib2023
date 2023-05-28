import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleListStoreClearActionDispatch,
  type ArticleListStoreClearActionOptions,
  type ArticleListStoreSliceName,
  createArticleListStoreClearActionPayload,
} from '../../../../../../features';
import { createArticleListStoreClearAction } from '../../../Actions';
import { useArticleListStoreDispatch } from '../../../ArticleListStoreHooks';

export function useStoreClearActionDispatch (
  sliceName: ArticleListStoreSliceName,
  {
    callback,
    dispatchType
  }: ArticleListStoreClearActionOptions = {}
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
