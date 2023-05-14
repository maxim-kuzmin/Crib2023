import { type Dispatch, useEffect, useRef } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleItemStoreSlice,
  type ArticleItemStoreSetActionCallback,
  type ArticleItemStoreSetActionDispatch,
  type ArticleItemStoreSetActionOptions,
  type ArticleItemStoreSetActionPayload,
} from '../../../../../../features';
import { ArticleItemStoreActionType } from '../../../ArticleItemStoreActionType';
import { type ArticleItemStoreActionUnion } from '../../../ArticleItemStoreActionUnion';
import { useArticleItemStoreDispatch } from '../../../ArticleItemStoreHooks';

interface Options {
  readonly callback?: ArticleItemStoreSetActionCallback;
  readonly dispatch: Dispatch<ArticleItemStoreActionUnion>;
  readonly payload: ArticleItemStoreSetActionPayload;
  readonly slice: string;
}

function runSetAction ({
  callback,
  dispatch,
  payload,
  slice
}: Options) {
  dispatch({
    payload,
    slice,
    type: ArticleItemStoreActionType.Set
  });

  if (callback) {
    callback(payload);
  }
}

export function useStoreSetActionDispatch (
  slice: ArticleItemStoreSlice,
  {
    callback,
    dispatchType,
    payloadOfSetAction
  }: ArticleItemStoreSetActionOptions
): ArticleItemStoreSetActionDispatch {
  const dispatch = useArticleItemStoreDispatch();

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfSetAction) {
        runSetAction({
          callback,
          dispatch,
          payload: payloadOfSetAction,
          slice
        });
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfSetAction) {
          runSetAction({
            callback,
            dispatch,
            payload: payloadOfSetAction,
            slice
          });
        }
      };
    },
    [
      callback,
      dispatch,
      dispatchType,
      payloadOfSetAction,
      slice
    ]
  );

  function run (payload: ArticleItemStoreSetActionPayload) {
    runSetAction({
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
