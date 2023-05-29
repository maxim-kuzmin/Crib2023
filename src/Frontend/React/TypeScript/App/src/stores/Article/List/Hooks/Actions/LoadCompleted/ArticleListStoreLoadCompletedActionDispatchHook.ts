import { useCallback, useEffect, useMemo } from 'react';
import { type StoreActionOptions, StoreDispatchType } from '../../../../../../common';
import {
  type ArticleListStoreLoadCompletedActionCallback,
  type ArticleListStoreLoadCompletedActionDispatch,
  type ArticleListStoreLoadCompletedActionPayload,
  type ArticleListStoreLoadCompletedActionResult,
  type ArticleListStoreSliceName,
  createArticleListStoreLoadCompletedActionPayload,
} from '../../../../../../features';
import { createArticleListStoreLoadCompletedAction } from '../../../Actions';
import { useArticleListStoreDispatch } from '../../../ArticleListStoreHooks';

interface Options extends StoreActionOptions {
  readonly callback?: ArticleListStoreLoadCompletedActionCallback;
  readonly resultOfLoadCompletedAction?: ArticleListStoreLoadCompletedActionResult;
}

export function useStoreLoadCompletedActionDispatch (
  sliceName: ArticleListStoreSliceName,
  {
    callback,
    dispatchType,
    resultOfLoadCompletedAction
  }: Options = {}
): ArticleListStoreLoadCompletedActionDispatch {
  const dispatch = useArticleListStoreDispatch();

  const payloadOfLoadCompletedAction = useMemo(
    () => createArticleListStoreLoadCompletedActionPayload({
      actionResult: resultOfLoadCompletedAction,
      sliceName,
    }),
    [resultOfLoadCompletedAction, sliceName]
  );

  const runInner = useCallback(
    (payload: ArticleListStoreLoadCompletedActionPayload) => {
      dispatch(createArticleListStoreLoadCompletedAction(payload));

      const { actionResult } = payload;

      if (callback && !actionResult?.error) {
        callback(actionResult);
      }
    },
    [callback, dispatch]
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

  return useMemo<ArticleListStoreLoadCompletedActionDispatch>(
    () => ({
      run: (actionResult: ArticleListStoreLoadCompletedActionResult) => {
        const payloadOfLoadCompletedActionInner = createArticleListStoreLoadCompletedActionPayload({
          ...payloadOfLoadCompletedAction,
          actionResult
        });

        runInner(payloadOfLoadCompletedActionInner);
      }
    }),
    [payloadOfLoadCompletedAction, runInner]
  );
}
