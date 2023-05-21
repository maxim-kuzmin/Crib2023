import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleListStoreSliceName,
  type ArticleListStoreSetActionDispatch,
  type ArticleListStoreSetActionOptions,
  type ArticleListStoreSetActionPayload,
} from '../../../../../../features';
import { ArticleListStoreActionType } from '../../../ArticleListStoreActionType';
import { useArticleListStoreDispatch } from '../../../ArticleListStoreHooks';

export function useStoreSetActionDispatch (
  sliceName: ArticleListStoreSliceName,
  {
    callback,
    dispatchType,
    payloadOfSetAction
  }: ArticleListStoreSetActionOptions = {}
): ArticleListStoreSetActionDispatch {
  const dispatch = useArticleListStoreDispatch();

  const run = useCallback(
    (payload: ArticleListStoreSetActionPayload) => {
      dispatch({ payload, sliceName, type: ArticleListStoreActionType.Set });

      if (callback) {
        callback(payload);
      }
    },
    [callback, dispatch, sliceName]
  );

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfSetAction) {
        run(payloadOfSetAction);
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfSetAction) {
          run(payloadOfSetAction);
        }
      };
    },
    [dispatchType, payloadOfSetAction, run]
  );

  return useMemo<ArticleListStoreSetActionDispatch>(() => ({ run }), [run]);
}
