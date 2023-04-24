import { type Dispatch, useEffect, useRef } from 'react';
import {
  type ArticleListStoreLoadCompletedActionCallback,
  type ArticleListStoreLoadCompletedActionDispatch,
  type ArticleListStoreLoadCompletedActionOptions,
  type ArticleListStoreLoadCompletedActionPayload,
} from '../../../../../../app/Stores';
import { StoreDispatchType } from '../../../../../../common';
import { ArticleListStoreActionType } from '../../../ArticleListStoreActionType';
import { type ArticleListStoreActionUnion } from '../../../ArticleListStoreActionUnion';
import { useArticleListStoreDispatchContext } from '../../../ArticleListStoreContext';

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
  sliceName: string,
  {
    callback,
    dispatchType,
    payloadOfLoadCompletedAction
  }: ArticleListStoreLoadCompletedActionOptions = {}
): ArticleListStoreLoadCompletedActionDispatch {
  const dispatch = useArticleListStoreDispatchContext();

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
