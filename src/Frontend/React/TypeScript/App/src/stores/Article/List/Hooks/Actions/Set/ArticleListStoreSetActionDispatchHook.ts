import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleListStoreSliceName,
  type ArticleListStoreSetActionDispatch,
  type ArticleListStoreSetActionOptions,
  type ArticleListStoreSetActionPayload,
  type ArticleListStoreSetActionResult,
  createArticleListStoreSetActionPayload,
} from '../../../../../../features';
import { ArticleListStoreActionType } from '../../../ArticleListStoreActionType';
import { useArticleListStoreDispatch } from '../../../ArticleListStoreHooks';

export function useStoreSetActionDispatch (
  sliceName: ArticleListStoreSliceName,
  {
    callback,
    dispatchType,
    resultOfSetAction
  }: ArticleListStoreSetActionOptions = {}
): ArticleListStoreSetActionDispatch {
  const dispatch = useArticleListStoreDispatch();

  const payloadOfSetAction = useMemo(
    () => createArticleListStoreSetActionPayload({ actionResult: resultOfSetAction }),
    [resultOfSetAction]
  );

  const run = useCallback(
    (payload: ArticleListStoreSetActionPayload) => {
      dispatch({ payload, sliceName, type: ArticleListStoreActionType.Set });

      if (callback) {
        callback(payload.actionResult);
      }
    },
    [callback, dispatch, sliceName]
  );

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        run(payloadOfSetAction);
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          run(payloadOfSetAction);
        }
      };
    },
    [dispatchType, payloadOfSetAction, run]
  );

  return useMemo<ArticleListStoreSetActionDispatch>(
    () => ({
      run: (actionResult: ArticleListStoreSetActionResult) => {
        const payloadOfSetActionInner = createArticleListStoreSetActionPayload({
          ...payloadOfSetAction,
          actionResult
        });

        run(payloadOfSetActionInner);
      }
    }),
    [payloadOfSetAction, run]
  );
}
