import { type Dispatch, useEffect, useRef } from 'react';
import {
  type ArticleItemStoreSetActionCallback,
  type ArticleItemStoreSetActionDispatch,
  type ArticleItemStoreSetActionOptions,
  type ArticleItemStoreSetActionPayload,
} from '../../../../app/Stores';
import { StoreDispatchType } from '../../../../common';
import { type ArticleItemStoreSetAction } from '../Actions';
import { ArticleItemStoreActionType } from '../ArticleItemStoreActionType';
import { useArticleItemStoreDispatchContext } from '../ArticleItemStoreContext';
import { type ArticleItemStoreActionUnion } from '../ArticleItemStoreActionUnion';

// ---Store---> //

type ActionUnion = ArticleItemStoreActionUnion;

type SetAction = ArticleItemStoreSetAction;
type SetActionCallback = ArticleItemStoreSetActionCallback;
type SetActionDispatch = ArticleItemStoreSetActionDispatch;
type SetActionOptions = ArticleItemStoreSetActionOptions;
type SetActionPayload = ArticleItemStoreSetActionPayload;

function createSetAction (sliceName: string, payload: SetActionPayload): SetAction {
  return {
    type: ArticleItemStoreActionType.Set,
    payload,
    sliceName
  };
};

function useDispatchContext (): Dispatch<ActionUnion> {
  return useArticleItemStoreDispatchContext();
}

// <---Store--- //

interface RunSetActionOptions {
  readonly callback?: SetActionCallback;
  readonly dispatch: Dispatch<ActionUnion>;
  readonly payload: SetActionPayload;
  readonly sliceName: string;
}

function runSetAction ({
  callback,
  dispatch,
  payload,
  sliceName
}: RunSetActionOptions) {
  dispatch(createSetAction(sliceName, payload));

  if (callback) {
    callback(payload);
  }
}

export function useSetActionDispatch (
  sliceName: string,
  {
    callback,
    dispatchType,
    payload
  }: SetActionOptions
): SetActionDispatch {
  const dispatch = useDispatchContext();

  const payloadInner = payload ?? null;

  useEffect(() => {
    if (dispatchType === StoreDispatchType.MountOrUpdate) {
      runSetAction({ sliceName, dispatch, callback, payload: payloadInner });
    };

    return () => {
      if (dispatchType === StoreDispatchType.Unmount) {
        runSetAction({ sliceName, dispatch, callback, payload: payloadInner });
      }
    };
  }, [sliceName, dispatch, dispatchType, callback, payloadInner]);

  return useRef({
    run: (payload: SetActionPayload) => {
      runSetAction({ sliceName, dispatch, callback, payload });
    }
  }).current;
}
