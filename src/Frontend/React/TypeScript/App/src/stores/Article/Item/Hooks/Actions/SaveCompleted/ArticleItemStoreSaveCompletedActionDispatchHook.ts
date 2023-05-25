import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleItemStoreSliceName,
  type ArticleItemStoreSaveCompletedActionDispatch,
  type ArticleItemStoreSaveCompletedActionOptions,
  type ArticleItemStoreSaveCompletedActionPayload,
  type ArticleItemStoreSaveCompletedActionResult,
  createArticleItemStoreSaveCompletedActionPayload,
} from '../../../../../../features';
import { ArticleItemStoreActionType } from '../../../ArticleItemStoreActionType';
import { useArticleItemStoreDispatch } from '../../../ArticleItemStoreHooks';

export function useStoreSaveCompletedActionDispatch (
  sliceName: ArticleItemStoreSliceName,
  {
    callback,
    dispatchType,
    resultOfSaveCompletedAction
  }: ArticleItemStoreSaveCompletedActionOptions = {}
): ArticleItemStoreSaveCompletedActionDispatch {
  const dispatch = useArticleItemStoreDispatch();

  const payloadOfSaveCompletedAction = useMemo(
    () => createArticleItemStoreSaveCompletedActionPayload({
      actionResult: resultOfSaveCompletedAction,
    }),
    [resultOfSaveCompletedAction]
  );

  const run = useCallback(
    (payload: ArticleItemStoreSaveCompletedActionPayload) => {
      dispatch({
        payload,
        sliceName,
        type: ArticleItemStoreActionType.SaveCompleted
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
        run(payloadOfSaveCompletedAction);
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          run(payloadOfSaveCompletedAction);
        }
      };
    },
    [dispatchType, payloadOfSaveCompletedAction, run]
  );

  return useMemo<ArticleItemStoreSaveCompletedActionDispatch>(
    () => ({
      run: (actionResult: ArticleItemStoreSaveCompletedActionResult) => {
        const payloadOfSaveCompletedActionInner = createArticleItemStoreSaveCompletedActionPayload({
          ...payloadOfSaveCompletedAction,
          actionResult
        });

        run(payloadOfSaveCompletedActionInner);
      }
    }),
    [payloadOfSaveCompletedAction, run]
  );
}
