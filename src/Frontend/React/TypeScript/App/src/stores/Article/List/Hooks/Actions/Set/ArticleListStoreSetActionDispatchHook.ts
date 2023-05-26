import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleListStoreSetActionDispatch,
  type ArticleListStoreSetActionOptions,
  type ArticleListStoreSetActionPayload,
  type ArticleListStoreSetActionResult,
  type ArticleListStoreSliceName,
  createArticleListStoreSetActionPayload,
} from '../../../../../../features';
import { createArticleListStoreSetAction } from '../../../Actions';
import { useArticleListStoreDispatch } from '../../../ArticleListStoreHooks';

export function useStoreSetActionDispatch (
  sliceName: ArticleListStoreSliceName,
  {
    callback,
    dispatchType,
    resultOfSetAction
  }: ArticleListStoreSetActionOptions = {}
): ArticleListStoreSetActionDispatch {
  const dispatch = useArticleListStoreDispatch();

  const payloadOfSetAction = useMemo(
    () => createArticleListStoreSetActionPayload({ actionResult: resultOfSetAction, sliceName }),
    [resultOfSetAction, sliceName]
  );

  const run = useCallback(
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
        run(payloadOfSetAction);
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          run(payloadOfSetAction);
        }
      };
    },
    [dispatchType, payloadOfSetAction, run]
  );

  return useMemo<ArticleListStoreSetActionDispatch>(
    () => ({
      run: (actionResult: ArticleListStoreSetActionResult) => {
        const payloadOfSetActionInner = createArticleListStoreSetActionPayload({
          ...payloadOfSetAction,
          actionResult
        });

        run(payloadOfSetActionInner);
      }
    }),
    [payloadOfSetAction, run]
  );
}
