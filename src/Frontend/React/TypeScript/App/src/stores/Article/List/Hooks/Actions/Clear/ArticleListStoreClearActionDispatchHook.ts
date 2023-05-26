import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleListStoreSliceName,
  type ArticleListStoreClearActionDispatch,
  type ArticleListStoreClearActionOptions,
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

  const run = useCallback(
    () => {
      dispatch(createArticleListStoreClearAction({ payload: payloadOfClearAction }));

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

  return useMemo<ArticleListStoreClearActionDispatch>(() => ({ run }), [run]);
}
