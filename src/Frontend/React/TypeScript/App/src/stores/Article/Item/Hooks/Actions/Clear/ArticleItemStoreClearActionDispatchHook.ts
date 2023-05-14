import { type Dispatch, useEffect, useRef } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleItemStoreOwner,
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
  readonly owner: string;
}

function runClearAction ({
  callback,
  dispatch,
  owner
}: Options) {
  dispatch({
    owner,
    type: ArticleItemStoreActionType.Clear
  });

  if (callback) {
    callback();
  }
}

export function useStoreClearActionDispatch (
  owner: ArticleItemStoreOwner,
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
          owner
        });
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          runClearAction({
            callback,
            dispatch,
            owner
          });
        }
      };
    },
    [
      callback,
      dispatch,
      dispatchType,
      owner
    ]
  );

  function run () {
    runClearAction({
      callback,
      dispatch,
      owner
    });
  }

  return useRef({
    run
  }).current;
}
