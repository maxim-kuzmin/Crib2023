import { type Dispatch, useEffect, useRef } from 'react';
import {
  type ArticleItemStoreDeleteCompletedActionCallback,
  type ArticleItemStoreDeleteCompletedActionDispatch,
  type ArticleItemStoreDeleteCompletedActionOptions,
  type ArticleItemStoreDeleteCompletedActionPayload,
} from '../../../../app/Stores';
import { StoreDispatchType } from '../../../../common';
import {
  type ArticleItemStoreDeleteCompletedAction,
} from '../Actions';
import { ArticleItemStoreActionType } from '../ArticleItemStoreActionType';
import {
  useArticleItemStoreDispatchContext,
} from '../ArticleItemStoreContext';
import { type ArticleItemStoreActionUnion } from '../ArticleItemStoreActionUnion';

// ---Store---> //

type ActionUnion = ArticleItemStoreActionUnion;

type DeleteCompletedAction = ArticleItemStoreDeleteCompletedAction;
type DeleteCompletedActionCallback = ArticleItemStoreDeleteCompletedActionCallback;
type DeleteCompletedActionDispatch = ArticleItemStoreDeleteCompletedActionDispatch;
type DeleteCompletedActionOptions = ArticleItemStoreDeleteCompletedActionOptions;
type DeleteCompletedActionPayload = ArticleItemStoreDeleteCompletedActionPayload;

function createDeleteCompletedAction (
  sliceName: string,
  payload: DeleteCompletedActionPayload
): DeleteCompletedAction {
  return {
    type: ArticleItemStoreActionType.DeleteCompleted,
    payload,
    sliceName
  };
};

function useDispatchContext (): Dispatch<ActionUnion> {
  return useArticleItemStoreDispatchContext();
}

// <---Store--- //

interface RunDeleteCompletedActionOptions {
  readonly callback?: DeleteCompletedActionCallback;
  readonly dispatch: Dispatch<ActionUnion>;
  readonly payload: DeleteCompletedActionPayload;
  readonly sliceName: string;
}

export function runDeleteCompletedAction ({
  callback,
  dispatch,
  payload,
  sliceName
}: RunDeleteCompletedActionOptions) {
  dispatch(createDeleteCompletedAction(sliceName, payload));

  if (callback) {
    callback(payload);
  }
}

export function useDeleteCompletedActionDispatch (
  sliceName: string,
  {
    callback,
    dispatchType,
    payload
  }: DeleteCompletedActionOptions = {}
): DeleteCompletedActionDispatch {
  const dispatch = useDispatchContext();

  const payloadInner = payload ?? null;

  useEffect(() => {
    if (dispatchType === StoreDispatchType.MountOrUpdate) {
      runDeleteCompletedAction({ sliceName, dispatch, callback, payload: payloadInner });
    };

    return () => {
      if (dispatchType === StoreDispatchType.Unmount) {
        runDeleteCompletedAction({ sliceName, dispatch, callback, payload: payloadInner });
      }
    };
  }, [sliceName, dispatch, dispatchType, callback, payloadInner]);

  return useRef({
    run: (payload: DeleteCompletedActionPayload) => {
      runDeleteCompletedAction({ sliceName, dispatch, callback, payload });
    }
  }).current;
}
