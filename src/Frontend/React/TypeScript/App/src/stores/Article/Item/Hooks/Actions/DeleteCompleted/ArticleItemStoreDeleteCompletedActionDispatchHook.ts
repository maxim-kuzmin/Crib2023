import { type Dispatch, useEffect, useRef } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleItemStoreSlice,
  type ArticleItemStoreDeleteCompletedActionCallback,
  type ArticleItemStoreDeleteCompletedActionDispatch,
  type ArticleItemStoreDeleteCompletedActionOptions,
  type ArticleItemStoreDeleteCompletedActionPayload,
} from '../../../../../../features';
import { ArticleItemStoreActionType } from '../../../ArticleItemStoreActionType';
import { type ArticleItemStoreActionUnion } from '../../../ArticleItemStoreActionUnion';
import { useArticleItemStoreDispatch } from '../../../ArticleItemStoreHooks';

interface Options {
  readonly callback?: ArticleItemStoreDeleteCompletedActionCallback;
  readonly dispatch: Dispatch<ArticleItemStoreActionUnion>;
  readonly payload: ArticleItemStoreDeleteCompletedActionPayload;
  readonly slice: string;
}

export function runDeleteCompletedAction ({
  callback,
  dispatch,
  payload,
  slice
}: Options) {
  dispatch({
    payload,
    slice,
    type: ArticleItemStoreActionType.DeleteCompleted
  });

  if (callback) {
    callback(payload);
  }
}

export function useStoreDeleteCompletedActionDispatch (
  slice: ArticleItemStoreSlice,
  {
    callback,
    dispatchType,
    payloadOfDeleteCompletedAction
  }: ArticleItemStoreDeleteCompletedActionOptions = {}
): ArticleItemStoreDeleteCompletedActionDispatch {
  const dispatch = useArticleItemStoreDispatch();

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfDeleteCompletedAction) {
        runDeleteCompletedAction({
          callback,
          dispatch,
          payload: payloadOfDeleteCompletedAction,
          slice,
      });
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfDeleteCompletedAction) {
          runDeleteCompletedAction({
            callback,
            dispatch,
            payload: payloadOfDeleteCompletedAction,
            slice,
          });
        }
      };
    },
    [
      callback,
      dispatch,
      dispatchType,
      payloadOfDeleteCompletedAction,
      slice
    ]
  );

  function run (payload: ArticleItemStoreDeleteCompletedActionPayload) {
    runDeleteCompletedAction({
      callback,
      dispatch,
      payload,
      slice
    });
  }

  return useRef({
    run
  }).current;
}
