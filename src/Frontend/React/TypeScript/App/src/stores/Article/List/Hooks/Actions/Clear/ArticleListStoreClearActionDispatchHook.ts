import { type Dispatch, useEffect, useRef } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleListStoreSlice,
  type ArticleListStoreClearActionCallback,
  type ArticleListStoreClearActionDispatch,
  type ArticleListStoreClearActionOptions,
} from '../../../../../../features';
import { ArticleListStoreActionType } from '../../../ArticleListStoreActionType';
import { type ArticleListStoreActionUnion } from '../../../ArticleListStoreActionUnion';
import { useArticleListStoreDispatch } from '../../../ArticleListStoreHooks';

interface Options {
  readonly callback?: ArticleListStoreClearActionCallback;
  readonly dispatch: Dispatch<ArticleListStoreActionUnion>;
  readonly slice: string;
}

function runClearAction ({
  callback,
  dispatch,
  slice
}: Options) {
  dispatch({
    slice,
    type: ArticleListStoreActionType.Clear
  });

  if (callback) {
    callback();
  }
}

export function useStoreClearActionDispatch (
  slice: ArticleListStoreSlice,
  {
    callback,
    dispatchType
  }: ArticleListStoreClearActionOptions = {}
): ArticleListStoreClearActionDispatch {
  const dispatch = useArticleListStoreDispatch();

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
