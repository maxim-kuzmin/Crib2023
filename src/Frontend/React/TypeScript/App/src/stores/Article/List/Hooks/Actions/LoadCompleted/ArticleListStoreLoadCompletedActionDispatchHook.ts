import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleListStoreLoadCompletedActionDispatch,
  type ArticleListStoreLoadCompletedActionOptions,
  type ArticleListStoreLoadCompletedActionPayload,
  type ArticleListStoreLoadCompletedActionResult,
  type ArticleListStoreSliceName,
  createArticleListStoreLoadCompletedActionPayload,
} from '../../../../../../features';
import { createArticleListStoreLoadCompletedAction } from '../../../Actions';
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
      sliceName,
    }),
    [resultOfLoadCompletedAction, sliceName]
  );

  const run = useCallback(
    (payload: ArticleListStoreLoadCompletedActionPayload) => {
      dispatch(createArticleListStoreLoadCompletedAction(payload));

      if (callback) {
        callback(payload.actionResult);
      }
    },
    [callback, dispatch]
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
