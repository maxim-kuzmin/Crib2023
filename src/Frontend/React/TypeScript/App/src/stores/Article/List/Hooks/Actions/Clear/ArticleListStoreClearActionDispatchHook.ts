import { type Dispatch, useEffect, useRef } from 'react';
import {
  type ArticleListStoreClearActionCallback,
  type ArticleListStoreClearActionDispatch,
  type ArticleListStoreClearActionOptions,
} from '../../../../../../app';
import { StoreDispatchType } from '../../../../../../common';
import { ArticleListStoreActionType } from '../../../ArticleListStoreActionType';
import { type ArticleListStoreActionUnion } from '../../../ArticleListStoreActionUnion';
import { useArticleListStoreDispatchContext } from '../../../ArticleListStoreContext';

interface Options {
  readonly callback?: ArticleListStoreClearActionCallback;
  readonly dispatch: Dispatch<ArticleListStoreActionUnion>;
  readonly sliceName: string;
}

function runClearAction ({
  callback,
  dispatch,
  sliceName
}: Options) {
  dispatch({
    sliceName,
    type: ArticleListStoreActionType.Clear
  });

  if (callback) {
    callback();
  }
}

export function useStoreClearActionDispatch (
  sliceName: string,
  {
    callback,
    dispatchType
  }: ArticleListStoreClearActionOptions = {}
): ArticleListStoreClearActionDispatch {
  const dispatch = useArticleListStoreDispatchContext();

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        runClearAction({
          callback,
          dispatch,
          sliceName
        });
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          runClearAction({
            callback,
            dispatch,
            sliceName
          });
        }
      };
    },
    [
      callback,
      dispatch,
      dispatchType,
      sliceName
    ]
  );

  function run () {
    runClearAction({
      callback,
      dispatch,
      sliceName
    });
  }

  return useRef({
    run
  }).current;
}
