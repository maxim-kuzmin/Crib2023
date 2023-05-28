import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleItemStoreSetActionDispatch,
  type ArticleItemStoreSetActionOptions,
  type ArticleItemStoreSetActionPayload,
  type ArticleItemStoreSetActionResult,
  type ArticleItemStoreSliceName,
  createArticleItemStoreSetActionPayload,
} from '../../../../../../features';
import { createArticleItemStoreSetAction } from '../../../Actions';
import { useArticleItemStoreDispatch } from '../../../ArticleItemStoreHooks';

export function useStoreSetActionDispatch (
  sliceName: ArticleItemStoreSliceName,
  {
    callback,
    dispatchType,
    resultOfSetAction
  }: ArticleItemStoreSetActionOptions = {}
): ArticleItemStoreSetActionDispatch {
  const dispatch = useArticleItemStoreDispatch();

  const payloadOfSetAction = useMemo(
    () => createArticleItemStoreSetActionPayload({ actionResult: resultOfSetAction, sliceName }),
    [resultOfSetAction, sliceName]
  );

  const runInner = useCallback(
    (payload: ArticleItemStoreSetActionPayload) => {
      dispatch(createArticleItemStoreSetAction(payload));

      if (callback) {
        callback(payload.actionResult);
      }
    },
    [callback, dispatch]
  );

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        runInner(payloadOfSetAction);
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          runInner(payloadOfSetAction);
        }
      };
    },
    [dispatchType, payloadOfSetAction, runInner]
  );

  return useMemo<ArticleItemStoreSetActionDispatch>(
    () => ({
      run: (actionResult: ArticleItemStoreSetActionResult) => {
        const payloadOfSetActionInner = createArticleItemStoreSetActionPayload({
          ...payloadOfSetAction,
          actionResult
        });

        runInner(payloadOfSetActionInner);
      }
    }),
    [payloadOfSetAction, runInner]
  );
}
