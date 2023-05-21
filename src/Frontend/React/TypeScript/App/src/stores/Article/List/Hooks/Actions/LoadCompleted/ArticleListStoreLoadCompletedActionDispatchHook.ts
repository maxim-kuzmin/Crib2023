import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleListStoreSliceName,
  type ArticleListStoreLoadCompletedActionDispatch,
  type ArticleListStoreLoadCompletedActionOptions,
  type ArticleListStoreLoadCompletedActionPayload,
} from '../../../../../../features';
import { ArticleListStoreActionType } from '../../../ArticleListStoreActionType';
import { useArticleListStoreDispatch } from '../../../ArticleListStoreHooks';

export function useStoreLoadCompletedActionDispatch (
  sliceName: ArticleListStoreSliceName,
  {
    callback,
    dispatchType,
    payloadOfLoadCompletedAction
  }: ArticleListStoreLoadCompletedActionOptions = {}
): ArticleListStoreLoadCompletedActionDispatch {
  const dispatch = useArticleListStoreDispatch();

  const run = useCallback(
    (payload: ArticleListStoreLoadCompletedActionPayload) => {
      dispatch({
        payload,
        sliceName,
        type: ArticleListStoreActionType.LoadCompleted
      });

      if (callback) {
        callback(payload);
      }
    },
    [callback, dispatch, sliceName]
  );

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfLoadCompletedAction) {
        run(payloadOfLoadCompletedAction);
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfLoadCompletedAction) {
          run(payloadOfLoadCompletedAction);
        }
      };
    },
    [dispatchType, payloadOfLoadCompletedAction, run]
  );

  return useMemo<ArticleListStoreLoadCompletedActionDispatch>(() => ({ run }), [run]);
}
