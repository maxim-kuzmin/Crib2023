import { type Dispatch, useEffect, useRef } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
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
  readonly storeKey: string;
}

function runClearAction ({
  callback,
  dispatch,
  storeKey
}: Options) {
  dispatch({
    storeKey,
    type: ArticleItemStoreActionType.Clear
  });

  if (callback) {
    callback();
  }
}

export function useStoreClearActionDispatch (
  storeKey: string,
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
          storeKey
        });
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          runClearAction({
            callback,
            dispatch,
            storeKey
          });
        }
      };
    },
    [
      callback,
      dispatch,
      dispatchType,
      storeKey
    ]
  );

  function run () {
    runClearAction({
      callback,
      dispatch,
      storeKey
    });
  }

  return useRef({
    run
  }).current;
}
