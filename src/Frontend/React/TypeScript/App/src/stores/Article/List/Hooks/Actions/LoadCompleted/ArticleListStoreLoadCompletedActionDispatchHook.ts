import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleListStoreSliceName,
  type ArticleListStoreLoadCompletedActionDispatch,
  type ArticleListStoreLoadCompletedActionOptions,
  type ArticleListStoreLoadCompletedActionPayload,
  type ArticleListStoreLoadCompletedActionResult,
  createArticleListStoreLoadCompletedActionPayload,
} from '../../../../../../features';
import { ArticleListStoreActionType } from '../../../ArticleListStoreActionType';
import { useArticleListStoreDispatch } from '../../../ArticleListStoreHooks';

export function useStoreLoadCompletedActionDispatch (
  sliceName: ArticleListStoreSliceName,
  {
    callback,
    dispatchType,
    resultOfLoadCompletedAction
  }: ArticleListStoreLoadCompletedActionOptions = {}
): ArticleListStoreLoadCompletedActionDispatch {
  const dispatch = useArticleListStoreDispatch();

  const payloadOfLoadCompletedAction = useMemo(
    () => createArticleListStoreLoadCompletedActionPayload({
      actionResult: resultOfLoadCompletedAction,
    }),
    [resultOfLoadCompletedAction]
  );

  const run = useCallback(
    (payload: ArticleListStoreLoadCompletedActionPayload) => {
      dispatch({
        payload,
        sliceName,
        type: ArticleListStoreActionType.LoadCompleted
      });

      if (callback) {
        callback(payload.actionResult);
      }
    },
    [callback, dispatch, sliceName]
  );

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        run(payloadOfLoadCompletedAction);
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          run(payloadOfLoadCompletedAction);
        }
      };
    },
    [dispatchType, payloadOfLoadCompletedAction, run]
  );

  return useMemo<ArticleListStoreLoadCompletedActionDispatch>(
    () => ({
      run: (actionResult: ArticleListStoreLoadCompletedActionResult) => {
        const payloadOfLoadCompletedActionInner = createArticleListStoreLoadCompletedActionPayload({
          ...payloadOfLoadCompletedAction,
          actionResult
        });

        run(payloadOfLoadCompletedActionInner);
      }
    }),
    [payloadOfLoadCompletedAction, run]
  );
}
