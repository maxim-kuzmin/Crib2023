import { useCallback, useEffect, useMemo } from 'react';
import { type StoreActionOptions, StoreDispatchType } from '../../../../../../common';
import {
  type ArticleItemStoreLoadCompletedActionDispatch,
  type ArticleItemStoreLoadCompletedActionPayload,
  type ArticleItemStoreLoadCompletedActionResult,
  type ArticleItemStoreSliceName,
  createArticleItemStoreLoadCompletedActionPayload,
} from '../../../../../../features';
import { createArticleItemStoreLoadCompletedAction } from '../../../Actions';
import { useArticleItemStoreDispatch } from '../../../ArticleItemStoreHooks';

interface Options extends StoreActionOptions {
  readonly resultOfLoadCompletedAction?: ArticleItemStoreLoadCompletedActionResult;
}

export function useStoreLoadCompletedActionDispatch (
  sliceName: ArticleItemStoreSliceName,
  {
    dispatchType,
    resultOfLoadCompletedAction
  }: Options = {}
): ArticleItemStoreLoadCompletedActionDispatch {
  const dispatch = useArticleItemStoreDispatch();

  const payloadOfLoadCompletedAction = useMemo(
    () => createArticleItemStoreLoadCompletedActionPayload({
      actionResult: resultOfLoadCompletedAction,
      sliceName,
    }),
    [resultOfLoadCompletedAction, sliceName]
  );

  const runInner = useCallback(
    (payload: ArticleItemStoreLoadCompletedActionPayload) => {
      dispatch(createArticleItemStoreLoadCompletedAction(payload));
    },
    [dispatch]
  );

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        runInner(payloadOfLoadCompletedAction);
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          runInner(payloadOfLoadCompletedAction);
        }
      };
    },
    [dispatchType, payloadOfLoadCompletedAction, runInner]
  );

  return useMemo<ArticleItemStoreLoadCompletedActionDispatch>(
    () => ({
      run: (actionResult: ArticleItemStoreLoadCompletedActionResult) => {
        const payloadOfLoadCompletedActionInner = createArticleItemStoreLoadCompletedActionPayload({
          ...payloadOfLoadCompletedAction,
          actionResult
        });

        runInner(payloadOfLoadCompletedActionInner);
      }
    }),
    [payloadOfLoadCompletedAction, runInner]
  );
}
