import { type Dispatch, useEffect, useRef } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleItemStoreSlice,
  type ArticleItemStoreSaveCompletedActionCallback,
  type ArticleItemStoreSaveCompletedActionDispatch,
  type ArticleItemStoreSaveCompletedActionOptions,
  type ArticleItemStoreSaveCompletedActionPayload,
} from '../../../../../../features';
import { ArticleItemStoreActionType } from '../../../ArticleItemStoreActionType';
import { type ArticleItemStoreActionUnion } from '../../../ArticleItemStoreActionUnion';
import { useArticleItemStoreDispatch } from '../../../ArticleItemStoreHooks';

interface Options {
  readonly callback?: ArticleItemStoreSaveCompletedActionCallback;
  readonly dispatch: Dispatch<ArticleItemStoreActionUnion>;
  readonly payload: ArticleItemStoreSaveCompletedActionPayload;
  readonly slice: string;
}

export function runSaveCompletedAction ({
  callback,
  dispatch,
  payload,
  slice
}: Options) {
  dispatch({
    payload,
    slice,
    type: ArticleItemStoreActionType.SaveCompleted
  });

  if (callback) {
    callback(payload);
  }
}

export function useStoreSaveCompletedActionDispatch (
  slice: ArticleItemStoreSlice,
  {
    callback,
    dispatchType,
    payloadOfSaveCompletedAction
  }: ArticleItemStoreSaveCompletedActionOptions = {}
): ArticleItemStoreSaveCompletedActionDispatch {
  const dispatch = useArticleItemStoreDispatch();

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfSaveCompletedAction) {
        runSaveCompletedAction({
          callback,
          dispatch,
          payload: payloadOfSaveCompletedAction,
          slice
        });
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfSaveCompletedAction) {
          runSaveCompletedAction({
            callback,
            dispatch,
            payload: payloadOfSaveCompletedAction,
            slice
          });
        }
      };
    },
    [
      callback,
      dispatch,
      dispatchType,
      payloadOfSaveCompletedAction,
      slice
    ]
  );

  function run (payload: ArticleItemStoreSaveCompletedActionPayload) {
    runSaveCompletedAction({
      callback,
      dispatch,
      payload,
      slice,
    });
  }

  return useRef({
    run
  }).current;
}
