import { type Dispatch, useEffect, useRef } from 'react';
import {
  type ArticleItemStoreDeleteCompletedActionCallback,
  type ArticleItemStoreDeleteCompletedActionDispatch,
  type ArticleItemStoreDeleteCompletedActionOptions,
  type ArticleItemStoreDeleteCompletedActionPayload,
} from '../../../../../../app/Stores';
import { StoreDispatchType } from '../../../../../../common';
import { ArticleItemStoreActionType } from '../../../ArticleItemStoreActionType';
import { type ArticleItemStoreActionUnion } from '../../../ArticleItemStoreActionUnion';
import { useArticleItemStoreDispatchContext } from '../../../ArticleItemStoreContext';

interface Options {
  readonly callback?: ArticleItemStoreDeleteCompletedActionCallback;
  readonly dispatch: Dispatch<ArticleItemStoreActionUnion>;
  readonly payload: ArticleItemStoreDeleteCompletedActionPayload;
  readonly sliceName: string;
}

export function runDeleteCompletedAction ({
  callback,
  dispatch,
  payload,
  sliceName
}: Options) {
  dispatch({
    payload,
    sliceName,
    type: ArticleItemStoreActionType.DeleteCompleted
  });

  if (callback) {
    callback(payload);
  }
}

export function useStoreDeleteCompletedActionDispatch (
  sliceName: string,
  {
    callback,
    dispatchType,
    payloadOfDeleteCompletedAction
  }: ArticleItemStoreDeleteCompletedActionOptions = {}
): ArticleItemStoreDeleteCompletedActionDispatch {
  const dispatch = useArticleItemStoreDispatchContext();

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfDeleteCompletedAction) {
        runDeleteCompletedAction({
          callback,
          dispatch,
          payload: payloadOfDeleteCompletedAction,
          sliceName,
      });
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfDeleteCompletedAction) {
          runDeleteCompletedAction({
            callback,
            dispatch,
            payload: payloadOfDeleteCompletedAction,
            sliceName,
          });
        }
      };
    },
    [
      callback,
      dispatch,
      dispatchType,
      payloadOfDeleteCompletedAction,
      sliceName
    ]
  );

  function run (payload: ArticleItemStoreDeleteCompletedActionPayload) {
    runDeleteCompletedAction({
      callback,
      dispatch,
      payload,
      sliceName
    });
  }

  return useRef({
    run
  }).current;
}
