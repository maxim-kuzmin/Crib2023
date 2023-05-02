import { type Dispatch, useEffect, useRef } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleItemStoreLoadCompletedActionCallback,
  type ArticleItemStoreLoadCompletedActionDispatch,
  type ArticleItemStoreLoadCompletedActionOptions,
  type ArticleItemStoreLoadCompletedActionPayload,
} from '../../../../../../features';
import { ArticleItemStoreActionType } from '../../../ArticleItemStoreActionType';
import { type ArticleItemStoreActionUnion } from '../../../ArticleItemStoreActionUnion';
import { useArticleItemStoreDispatch } from '../../../ArticleItemStoreHooks';

interface Options {
  readonly callback?: ArticleItemStoreLoadCompletedActionCallback;
  readonly dispatch: Dispatch<ArticleItemStoreActionUnion>;
  readonly payload: ArticleItemStoreLoadCompletedActionPayload;
  readonly sliceName: string;
}

export function runLoadCompletedAction ({
  callback,
  dispatch,
  payload,
  sliceName
}: Options) {
  dispatch({
    payload,
    sliceName,
    type: ArticleItemStoreActionType.LoadCompleted
  });

  if (callback) {
    callback(payload);
  }
}

export function useStoreLoadCompletedActionDispatch (
  sliceName: string,
  {
    callback,
    dispatchType,
    payloadOfLoadCompletedAction
  }: ArticleItemStoreLoadCompletedActionOptions = {}
): ArticleItemStoreLoadCompletedActionDispatch {
  const dispatch = useArticleItemStoreDispatch();

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfLoadCompletedAction) {
        runLoadCompletedAction({
          callback,
          dispatch,
          payload: payloadOfLoadCompletedAction,
          sliceName
        });
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfLoadCompletedAction) {
          runLoadCompletedAction({
            callback,
            dispatch,
            payload: payloadOfLoadCompletedAction,
            sliceName
          });
        }
      };
    },
    [
      callback,
      dispatch,
      dispatchType,
      payloadOfLoadCompletedAction,
      sliceName
    ]
  );

  function run (payload: ArticleItemStoreLoadCompletedActionPayload) {
    runLoadCompletedAction({
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
