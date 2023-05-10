import { type Dispatch, useEffect, useRef } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
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
  readonly storeKey: string;
}

function runClearAction ({
  callback,
  dispatch,
  storeKey
}: Options) {
  dispatch({
    storeKey,
    type: ArticleListStoreActionType.Clear
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
  }: ArticleListStoreClearActionOptions = {}
): ArticleListStoreClearActionDispatch {
  const dispatch = useArticleListStoreDispatch();

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
