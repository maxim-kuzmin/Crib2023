import { type Dispatch, useEffect, useRef } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleListStoreOwner,
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
  readonly owner: string;
}

function runClearAction ({
  callback,
  dispatch,
  owner
}: Options) {
  dispatch({
    owner,
    type: ArticleListStoreActionType.Clear
  });

  if (callback) {
    callback();
  }
}

export function useStoreClearActionDispatch (
  owner: ArticleListStoreOwner,
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
