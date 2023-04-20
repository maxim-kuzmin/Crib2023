import { type Dispatch, useEffect, useRef } from 'react';
import {
  type ArticleItemStoreLoadCompletedActionCallback,
  type ArticleItemStoreLoadCompletedActionDispatch,
  type ArticleItemStoreLoadCompletedActionOptions,
  type ArticleItemStoreLoadCompletedActionPayload,
} from '../../../../../../app/Stores';
import { StoreDispatchType } from '../../../../../../common';
import { type ArticleItemStoreLoadCompletedAction } from '../../../Actions';
import { ArticleItemStoreActionType } from '../../../ArticleItemStoreActionType';
import { useArticleItemStoreDispatchContext } from '../../../ArticleItemStoreContext';
import { type ArticleItemStoreActionUnion } from '../../../ArticleItemStoreActionUnion';

// ---Store---> //

type ActionUnion = ArticleItemStoreActionUnion;

type LoadCompletedAction = ArticleItemStoreLoadCompletedAction;
type LoadCompletedActionCallback = ArticleItemStoreLoadCompletedActionCallback;
type LoadCompletedActionDispatch = ArticleItemStoreLoadCompletedActionDispatch;
type LoadCompletedActionOptions = ArticleItemStoreLoadCompletedActionOptions;
type LoadCompletedActionPayload = ArticleItemStoreLoadCompletedActionPayload;

function createLoadCompletedAction (
  sliceName: string,
  payload: LoadCompletedActionPayload
): LoadCompletedAction {
  return {
    type: ArticleItemStoreActionType.LoadCompleted,
    payload,
    sliceName
  };
};

function useDispatchContext (): Dispatch<ActionUnion> {
  return useArticleItemStoreDispatchContext();
}

// <---Store--- //

interface RunLoadCompletedActionOptions {
  readonly callback?: LoadCompletedActionCallback;
  readonly dispatch: Dispatch<ActionUnion>;
  readonly payload: LoadCompletedActionPayload;
  readonly sliceName: string;
}

export function runLoadCompletedAction ({
  callback,
  dispatch,
  payload,
  sliceName
}: RunLoadCompletedActionOptions) {
  dispatch(createLoadCompletedAction(sliceName, payload));

  if (callback) {
    callback(payload);
  }
}

export function useLoadCompletedActionDispatch (
  sliceName: string,
  {
    callback,
    dispatchType,
    payload
  }: LoadCompletedActionOptions = {}
): LoadCompletedActionDispatch {
  const dispatch = useDispatchContext();

  const payloadInner = payload ?? null;

  useEffect(() => {
    if (dispatchType === StoreDispatchType.MountOrUpdate) {
      runLoadCompletedAction({ sliceName, dispatch, callback, payload: payloadInner });
    };

    return () => {
      if (dispatchType === StoreDispatchType.Unmount) {
        runLoadCompletedAction({ sliceName, dispatch, callback, payload: payloadInner });
      }
    };
  }, [sliceName, dispatch, dispatchType, callback, payloadInner]);

  return useRef({
    run: (payload: LoadCompletedActionPayload) => {
      runLoadCompletedAction({ sliceName, dispatch, callback, payload });
    }
  }).current;
}
