import { type Dispatch, useEffect, useRef } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleItemStoreSlice,
  type ArticleItemStoreClearActionCallback,
  type ArticleItemStoreClearActionDispatch,
  type ArticleItemStoreClearActionOptions,
} from '../../../../../../features';
import { ArticleItemStoreActionType } from '../../../ArticleItemStoreActionType';
import { type ArticleItemStoreActionUnion } from '../../../ArticleItemStoreActionUnion';
import { useArticleItemStoreDispatch } from '../../../ArticleItemStoreHooks';

interface Options {
  readonly callback?: ArticleItemStoreClearActionCallback;
  readonly dispatch: Dispatch<ArticleItemStoreActionUnion>;
  readonly slice: string;
}

function runClearAction ({
  callback,
  dispatch,
  slice
}: Options) {
  dispatch({
    slice,
    type: ArticleItemStoreActionType.Clear
  });

  if (callback) {
    callback();
  }
}

export function useStoreClearActionDispatch (
  slice: ArticleItemStoreSlice,
  {
    callback,
    dispatchType
  }: ArticleItemStoreClearActionOptions = {}
): ArticleItemStoreClearActionDispatch {
  const dispatch = useArticleItemStoreDispatch();

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        runClearAction({
          callback,
          dispatch,
          slice
        });
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          runClearAction({
            callback,
            dispatch,
            slice
          });
        }
      };
    },
    [
      callback,
      dispatch,
      dispatchType,
      slice
    ]
  );

  function run () {
    runClearAction({
      callback,
      dispatch,
      slice
    });
  }

  return useRef({
    run
  }).current;
}
