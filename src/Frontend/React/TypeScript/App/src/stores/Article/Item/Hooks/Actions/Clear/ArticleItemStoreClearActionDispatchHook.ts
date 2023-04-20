import { type Dispatch, useEffect, useRef } from 'react';
import {
  type ArticleItemStoreClearActionCallback,
  type ArticleItemStoreClearActionDispatch,
  type ArticleItemStoreClearActionOptions,
} from '../../../../../../app/Stores';
import { StoreDispatchType } from '../../../../../../common';
import { type ArticleItemStoreClearAction } from '../../../Actions';
import { ArticleItemStoreActionType } from '../../../ArticleItemStoreActionType';
import { useArticleItemStoreDispatchContext } from '../../../ArticleItemStoreContext';
import { type ArticleItemStoreActionUnion } from '../../../ArticleItemStoreActionUnion';

// ---Store---> //

type ActionUnion = ArticleItemStoreActionUnion;

type ClearAction = ArticleItemStoreClearAction;
type ClearActionCallback = ArticleItemStoreClearActionCallback;
type ClearActionDispatch = ArticleItemStoreClearActionDispatch;
type ClearActionOptions = ArticleItemStoreClearActionOptions;

function createClearAction (sliceName: string): ClearAction {
  return {
    type: ArticleItemStoreActionType.Clear,
    sliceName
  };
};

function useDispatchContext (): Dispatch<ActionUnion> {
  return useArticleItemStoreDispatchContext();
}

// <---Store--- //

interface RunClearActionOptions {
  readonly callback?: ClearActionCallback;
  readonly dispatch: Dispatch<ActionUnion>;
  readonly sliceName: string;
}

function runClearAction ({
  callback,
  dispatch,
  sliceName
}: RunClearActionOptions) {
  dispatch(createClearAction(sliceName));

  if (callback) {
    callback();
  }
}

export function useClearActionDispatch (
  sliceName: string,
  {
    callback,
    dispatchType
  }: ClearActionOptions = {}
): ClearActionDispatch {
  const dispatch = useDispatchContext();

  useEffect(() => {
    if (dispatchType === StoreDispatchType.MountOrUpdate) {
      runClearAction({ sliceName, dispatch, callback });
    };

    return () => {
      if (dispatchType === StoreDispatchType.Unmount) {
        runClearAction({ sliceName, dispatch, callback });
      }
    };
  }, [sliceName, dispatch, dispatchType, callback]);

  return useRef({
    run: () => {
      runClearAction({ sliceName, dispatch, callback });
    }
  }).current;
}
