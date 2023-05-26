import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleItemStoreSaveCompletedActionDispatch,
  type ArticleItemStoreSaveCompletedActionOptions,
  type ArticleItemStoreSaveCompletedActionPayload,
  type ArticleItemStoreSaveCompletedActionResult,
  type ArticleItemStoreSliceName,
  createArticleItemStoreSaveCompletedActionPayload,
} from '../../../../../../features';
import { createArticleItemStoreSaveCompletedAction } from '../../../Actions';
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
      sliceName,
    }),
    [resultOfSaveCompletedAction, sliceName]
  );

  const run = useCallback(
    (payload: ArticleItemStoreSaveCompletedActionPayload) => {
      dispatch(createArticleItemStoreSaveCompletedAction(payload));

      if (callback) {
        callback(payload.actionResult);
      }
    },
    [callback, dispatch]
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
