import { type Dispatch, useEffect, useRef } from 'react';
import {
  type ArticleItemStoreSaveCompletedActionCallback,
  type ArticleItemStoreSaveCompletedActionDispatch,
  type ArticleItemStoreSaveCompletedActionOptions,
  type ArticleItemStoreSaveCompletedActionPayload,
} from '../../../../../../app/Stores';
import { StoreDispatchType } from '../../../../../../common';
import { type ArticleItemStoreSaveCompletedAction } from '../../../Actions';
import { ArticleItemStoreActionType } from '../../../ArticleItemStoreActionType';
import { useArticleItemStoreDispatchContext } from '../../../ArticleItemStoreContext';
import { type ArticleItemStoreActionUnion } from '../../../ArticleItemStoreActionUnion';

// ---Store---> //

type ActionUnion = ArticleItemStoreActionUnion;

type SaveCompletedAction = ArticleItemStoreSaveCompletedAction;
type SaveCompletedActionCallback = ArticleItemStoreSaveCompletedActionCallback;
type SaveCompletedActionDispatch = ArticleItemStoreSaveCompletedActionDispatch;
type SaveCompletedActionOptions = ArticleItemStoreSaveCompletedActionOptions;
type SaveCompletedActionPayload = ArticleItemStoreSaveCompletedActionPayload;

function createSaveCompletedAction (
  sliceName: string,
  payload: SaveCompletedActionPayload
): SaveCompletedAction {
  return {
    type: ArticleItemStoreActionType.SaveCompleted,
    payload,
    sliceName
  };
};

function useDispatchContext (): Dispatch<ActionUnion> {
  return useArticleItemStoreDispatchContext();
}

// <---Store--- //

interface RunSaveCompletedActionOptions {
  readonly callback?: SaveCompletedActionCallback;
  readonly dispatch: Dispatch<ActionUnion>;
  readonly payload: SaveCompletedActionPayload;
  readonly sliceName: string;
}

export function runSaveCompletedAction ({
  callback,
  dispatch,
  payload,
  sliceName
}: RunSaveCompletedActionOptions) {
  dispatch(createSaveCompletedAction(sliceName, payload));

  if (callback) {
    callback(payload);
  }
}

export function useSaveCompletedActionDispatch (
  sliceName: string,
  {
    callback,
    dispatchType,
    payload
  }: SaveCompletedActionOptions = {}
): SaveCompletedActionDispatch {
  const dispatch = useDispatchContext();

  const payloadInner = payload ?? null;

  useEffect(() => {
    if (dispatchType === StoreDispatchType.MountOrUpdate) {
      runSaveCompletedAction({ sliceName, dispatch, callback, payload: payloadInner });
    };

    return () => {
      if (dispatchType === StoreDispatchType.Unmount) {
        runSaveCompletedAction({ sliceName, dispatch, callback, payload: payloadInner });
      }
    };
  }, [sliceName, dispatch, dispatchType, callback, payloadInner]);

  return useRef({
    run: (payload: SaveCompletedActionPayload) => {
      runSaveCompletedAction({ sliceName, dispatch, callback, payload });
    }
  }).current;
}
