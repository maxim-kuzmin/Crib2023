import { useCallback, useEffect, useMemo } from 'react';
import { type StoreActionOptions, StoreDispatchType } from '../../../../../../common';
import {
  type ArticleListStoreSetActionCallback,
  type ArticleListStoreSetActionDispatch,
  type ArticleListStoreSetActionPayload,
  type ArticleListStoreSetActionResult,
  type ArticleListStoreSliceName,
  createArticleListStoreSetActionPayload,
} from '../../../../../../features';
import { createArticleListStoreSetAction } from '../../../Actions';
import { useArticleListStoreDispatch } from '../../../ArticleListStoreHooks';

interface Options extends StoreActionOptions {
  readonly callback?: ArticleListStoreSetActionCallback;
  readonly resultOfSetAction?: ArticleListStoreSetActionResult;
}

export function useStoreSetActionDispatch (
  sliceName: ArticleListStoreSliceName,
  {
    callback,
    dispatchType,
    resultOfSetAction
  }: Options = {}
): ArticleListStoreSetActionDispatch {
  const dispatch = useArticleListStoreDispatch();

  const payloadOfSetAction = useMemo(
    () => createArticleListStoreSetActionPayload({ actionResult: resultOfSetAction, sliceName }),
    [resultOfSetAction, sliceName]
  );

  const runInner = useCallback(
    (payload: ArticleListStoreSetActionPayload) => {
      dispatch(createArticleListStoreSetAction(payload));

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

  return useMemo<ArticleListStoreSetActionDispatch>(
    () => ({
      run: (actionResult: ArticleListStoreSetActionResult) => {
        const payloadOfSetActionInner = createArticleListStoreSetActionPayload({
          ...payloadOfSetAction,
          actionResult
        });

        runInner(payloadOfSetActionInner);
      }
    }),
    [payloadOfSetAction, runInner]
  );
}
