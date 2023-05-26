import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleItemStoreLoadCompletedActionDispatch,
  type ArticleItemStoreLoadCompletedActionOptions,
  type ArticleItemStoreLoadCompletedActionPayload,
  type ArticleItemStoreLoadCompletedActionResult,
  type ArticleItemStoreSliceName,
  createArticleItemStoreLoadCompletedActionPayload,
} from '../../../../../../features';
import { createArticleItemStoreLoadCompletedAction } from '../../../Actions';
import { useArticleItemStoreDispatch } from '../../../ArticleItemStoreHooks';

export function useStoreLoadCompletedActionDispatch (
  sliceName: ArticleItemStoreSliceName,
  {
    callback,
    dispatchType,
    resultOfLoadCompletedAction
  }: ArticleItemStoreLoadCompletedActionOptions = {}
): ArticleItemStoreLoadCompletedActionDispatch {
  const dispatch = useArticleItemStoreDispatch();

  const payloadOfLoadCompletedAction = useMemo(
    () => createArticleItemStoreLoadCompletedActionPayload({
      actionResult: resultOfLoadCompletedAction,
      sliceName,
    }),
    [resultOfLoadCompletedAction, sliceName]
  );

  const run = useCallback(
    (payload: ArticleItemStoreLoadCompletedActionPayload) => {
      dispatch(createArticleItemStoreLoadCompletedAction(payload));

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

  return useMemo<ArticleItemStoreLoadCompletedActionDispatch>(
    () => ({
      run: (actionResult: ArticleItemStoreLoadCompletedActionResult) => {
        const payloadOfLoadCompletedActionInner = createArticleItemStoreLoadCompletedActionPayload({
          ...payloadOfLoadCompletedAction,
          actionResult
        });

        run(payloadOfLoadCompletedActionInner);
      }
    }),
    [payloadOfLoadCompletedAction, run]
  );
}
