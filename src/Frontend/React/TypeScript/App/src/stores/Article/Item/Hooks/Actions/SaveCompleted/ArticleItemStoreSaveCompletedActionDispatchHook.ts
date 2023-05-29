import { useCallback, useEffect, useMemo } from 'react';
import { type StoreActionOptions, StoreDispatchType } from '../../../../../../common';
import {
  type ArticleItemStoreSaveCompletedActionDispatch,
  type ArticleItemStoreSaveCompletedActionPayload,
  type ArticleItemStoreSaveCompletedActionResult,
  type ArticleItemStoreSliceName,
  createArticleItemStoreSaveCompletedActionPayload,
} from '../../../../../../features';
import { createArticleItemStoreSaveCompletedAction } from '../../../Actions';
import { useArticleItemStoreDispatch } from '../../../ArticleItemStoreHooks';

interface Options extends StoreActionOptions {
  readonly resultOfSaveCompletedAction?: ArticleItemStoreSaveCompletedActionResult;
}

export function useStoreSaveCompletedActionDispatch (
  sliceName: ArticleItemStoreSliceName,
  {
    dispatchType,
    resultOfSaveCompletedAction
  }: Options = {}
): ArticleItemStoreSaveCompletedActionDispatch {
  const dispatch = useArticleItemStoreDispatch();

  const payloadOfSaveCompletedAction = useMemo(
    () => createArticleItemStoreSaveCompletedActionPayload({
      actionResult: resultOfSaveCompletedAction,
      sliceName,
    }),
    [resultOfSaveCompletedAction, sliceName]
  );

  const runInner = useCallback(
    (payload: ArticleItemStoreSaveCompletedActionPayload) => {
      dispatch(createArticleItemStoreSaveCompletedAction(payload));
    },
    [dispatch]
  );

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        runInner(payloadOfSaveCompletedAction);
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          runInner(payloadOfSaveCompletedAction);
        }
      };
    },
    [dispatchType, payloadOfSaveCompletedAction, runInner]
  );

  return useMemo<ArticleItemStoreSaveCompletedActionDispatch>(
    () => ({
      run: (actionResult: ArticleItemStoreSaveCompletedActionResult) => {
        const payloadOfSaveCompletedActionInner = createArticleItemStoreSaveCompletedActionPayload({
          ...payloadOfSaveCompletedAction,
          actionResult
        });

        runInner(payloadOfSaveCompletedActionInner);
      }
    }),
    [payloadOfSaveCompletedAction, runInner]
  );
}
