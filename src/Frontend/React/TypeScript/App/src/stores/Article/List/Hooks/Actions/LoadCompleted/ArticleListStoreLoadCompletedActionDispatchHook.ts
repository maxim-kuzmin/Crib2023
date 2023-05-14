import { type Dispatch, useEffect, useRef } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleListStoreSliceName,
  type ArticleListStoreLoadCompletedActionCallback,
  type ArticleListStoreLoadCompletedActionDispatch,
  type ArticleListStoreLoadCompletedActionOptions,
  type ArticleListStoreLoadCompletedActionPayload,
} from '../../../../../../features';
import { ArticleListStoreActionType } from '../../../ArticleListStoreActionType';
import { type ArticleListStoreActionUnion } from '../../../ArticleListStoreActionUnion';
import { useArticleListStoreDispatch } from '../../../ArticleListStoreHooks';

interface Options {
  readonly callback?: ArticleListStoreLoadCompletedActionCallback;
  readonly dispatch: Dispatch<ArticleListStoreActionUnion>;
  readonly payload: ArticleListStoreLoadCompletedActionPayload;
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
    type: ArticleListStoreActionType.LoadCompleted
  });

  if (callback) {
    callback(payload);
  }
}

export function useStoreLoadCompletedActionDispatch (
  sliceName: ArticleListStoreSliceName,
  {
    callback,
    dispatchType,
    payloadOfLoadCompletedAction
  }: ArticleListStoreLoadCompletedActionOptions = {}
): ArticleListStoreLoadCompletedActionDispatch {
  const dispatch = useArticleListStoreDispatch();

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

  function run (payload: ArticleListStoreLoadCompletedActionPayload) {
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
